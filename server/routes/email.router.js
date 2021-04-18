require('dotenv').config();
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
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
      res.send("No email found");
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
    const userInfo = dbRes.rows;
    // send the email to the users email
    const info =  await transporter.sendMail({
      from: process.env.EMAIL,
      to: `${userInfo.email}`,
      subject: "Password Change Request",
      text: `
      Regarding your password change request, please click the link provided and follow the instructions there. 
      `,
    }, (err, info) => {
      if (err) {
        res.send('💥 error sending email', err);
      } ;
      console.log('🎉 it has been sent', info.response)
    });
    
  }
  catch(err) {
    console.log('🎹 something went wrong with the forgot password', err);
  }
})


module.exports = router;
