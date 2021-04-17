require('dotenv').config();
const express = require('express');
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
})

module.exports = router;
