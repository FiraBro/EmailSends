const { sendEmail } = require("../utils/email");

exports.sendEmail = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide name, email, and message.",
      });
    }

    const mailOptions = {
      from: `"${name}" <${email}>`, // Sender's name and email
      to: "jemalfiragos@gmail.com", // Replace with your receiving email
      subject: "New Message from User",
      text: message, // Plain text body
    };

    await sendEmail(mailOptions);

    res.status(200).json({
      status: "success",
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    next(error);
  }
};
