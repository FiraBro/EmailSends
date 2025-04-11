const nodemailer = require("nodemailer");

async function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", // Replace with your SMTP host
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "your-email@example.com", // Replace with your email
      pass: "your-email-password", // Replace with your email password
    },
  });

  await transporter.sendMail(options);
}

module.exports = { sendEmail };
