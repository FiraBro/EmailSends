// const nodemailer = require("nodemailer");

// async function sendEmail(options) {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email", // Replace with your SMTP host
//     port: 587,
//     secure: false, // true for port 465, false for other ports
//     auth: {
//       user: "jemalfiragos@gmail.com", // Replace with your email
//       pass: "Ham3230@F", // Replace with your email password
//     },
//   });

//   await transporter.sendMail(options);
// }

// module.exports = { sendEmail };
const nodemailer = require("nodemailer");

async function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jemalfiragos@gmail.com", // Your Gmail address
      pass: "giesvnlouvsnquib", // Your Gmail app password
    },
  });
  await transporter.sendMail(options);
}
module.exports = { sendEmail };
