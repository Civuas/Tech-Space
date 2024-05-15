const nodemailer = require("nodemailer");
require("dotenv").config();

const sender = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL_ID,
    pass: process.env.AUTH_EMAIL_PASS,
  },
});

module.exports = sender;
