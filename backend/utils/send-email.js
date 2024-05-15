const sender = require("../config/emailConfig");
require("dotenv").config();

const EMAIL_ID = process.env.AUTH_EMAIL_ID;

const sendVerificationMail = async (email, token) => {
  try {
    const response = await sender.sendMail({
      from: EMAIL_ID,
      to: email,
      subject: "Verify your account - TechSpace",
      html: `<p>Thank you for registering with TechSpace .<p>  We're excited to have you on board</br>.
      To complete your registration and verify your account,</br>

      please enter the  4-digit OTP: <b>${token}</b> <br/>

      <p>This OTP is valid for the next <b>3</b> minutes. If you did not request this OTP or have any
      concerns, please contact our support team at support@techspace.com.</p>

      <p>Once you've entered the OTP, you'll be able to access all the features and benefits of TechSpace.</p> </br>

      <p>We hope you enjoy using our app and look forward to providing you with a great experience.</p><br/>

      Best regards,<br/>
      TechSpace Team <br/>
    `,
    });
    console.log("email was sent to", email);
  } catch (error) {
    console.log(error);
  }
};
module.exports = sendVerificationMail;
