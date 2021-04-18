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
      console.log('💥 error sending', err);
      return;
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

    console.log('returned from db with', dbRes.rows);
    
  }
  catch(err) {
    console.log('🎹 something went wrong with the forgot password', err);
  }
})


module.exports = router;
