require('dotenv').config();
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// import nodemailer
const nodemailer = require("nodemailer");
// make the "transporter"
// this is the email that will do the sending 
const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
});


/*
the email needs a req.body as follows:
{
  customerEmail: users.email
  message: 'The message to be sent'
}
*/
router.post('/', rejectUnauthenticated, async (req, res) => {
  const info =  await transporter.sendMail({
    from: process.env.EMAIL,
    to: `${req.body.customerEmail}`,
    subject: "Sample info from Canomiks",
    text: `${req.body.message}`,
  }, (err, info) => {
    if (err) {
      res.send('💥 error sending email', err);
    } ;
    console.log('🎉 it has been sent', info.response)
  });
  
  res.sendStatus(200);
}); // end basic email


//       ------ playing around -----

// router.get('/test', (req, res) => {
//   res.json({
//     message: 'Welcome to the API'
//   })
// });

router.post('/protected', verifyToken, (req, res) => {

  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {

    if(err) {
      res.sendStatus(403);
    };

    res.json({
      message: 'Protected with jwt',
      authData
    });
  });

});

// router.post('/test', (req, res) => {

//   const secret = process.env.JWT_SECRET 
//     const payload = {
//       email: 'ladeda@email.com',
//       id: '3'
//     };

//   jwt.sign(payload, secret, {expiresIn: '30s'}, (err, token) => {
//     res.json({
//       token
//     })
//   });
// });

// // formatted
// // Authorization: Bearer <access_token> 

function verifyToken (req, res, next) {
  // get auth header
  const bearerHeader = req.headers['authorization'];

  // check if undefined
  if (bearerHeader === undefined) {
    res.sendStatus(403);
    return;
  };
  // split at the space
  const bearer = bearerHeader.split(' ')[1];
  req.token = bearer;
  // keep going
  next();
}


//  ----------------

let token;

router.post('/forgotPassword', async (req, res) => {
  try{
    // get user info from db that matched the entered email
    const sqlText = `
    SELECT * FROM "users"
    WHERE "email" = $1;
    `;
    const dbRes = await pool.query(sqlText, [req.body.email]);

    // if no user if found, return no email found
    if (dbRes.rows.length === 0) {
      console.log('💥 no email found');
      res.status(404).send("No email found")
      return;
    };

    /*
    {
    id: 3,
    email: 'josh@SNR.com',
    password: '$2a$10$ztPSRgi94yCnY3cQxPci3us5gQ33xC5nUuN4U1noT2TThARvRwH.S',
    name: 'Josh',
    companyID: 3,
    authLevel: 'team'
    }
    */

    // if the email exists, get the info
    const userInfo = dbRes.rows[0];

    // create one time link to send the user
    const secret = process.env.JWT_SECRET + userInfo.password;
    const payload = {
      email: userInfo.email,
      id: userInfo.id
    };

    token = jwt.sign(payload, secret);


    const link = `http://localhost:3000/?id=${userInfo.id}&token=${token}/#/resetPassword`;

    const link2 = `http://localhost:3000/#/resetPassword/${token}/${userInfo.id}`

    res.send('got it')
    // send the email to the users email
    const info =  await transporter.sendMail({
      from: process.env.EMAIL,
      to: `joshlobosgulledge@gmail.com`,
      subject: "Password Change Request",
      text: `
      Regarding your password change request, please click the link provided and follow the instructions there. 
      ${link2}
      `,
    }, (err, info) => {
      if (err) {
        res.send('💥 error sending email', err);
      } ;
      console.log('🎉 it has been sent', info.response);
      res.send('it worked')
    });
    
  }
  catch(err) {
    console.log('🎹 something went wrong with the forgot password', err);
  }
});



module.exports = router;
