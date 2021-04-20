require('dotenv').config();

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

const info = transporter.sendMail({
  from: "canomiksTeam@outlook.com",
  to: "test@mail.com",
  subject: "Sample info from Canomiks",
  text: `hello`,
}, (err, info) => {
  if (err) {
    console.log('💥 error sending', err);
    return;
  };
  console.log('🎉 it has been sent', info.response)
});