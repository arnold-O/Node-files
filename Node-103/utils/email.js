const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transpoter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // activate in gmail "less secure app" option
  });
  const mailOption = {
    from: `${process.env.FROM_NAME}<${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transpoter.sendMail(mailOption);
};

module.exports = sendEmail;
