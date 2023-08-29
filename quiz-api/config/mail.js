const nodemailer = require("nodemailer");
const env = require("./env");

const transporter = nodemailer.createTransport({
  service: env.SMTP_MAIL_SERVICE,
  auth: {
    user: env.SMTP_MAIL_USER,
    pass: env.SMTP_MAIL_PASSWORD,
  },
});

async function sendMail(options) {
  try {
    if (!options || !options.to || !options.subject || !options.html) {
      throw Error("Missing options");
    }

    if (!transporter) {
      throw Error("Transporter is not defined");
    }

    const mailOptions = {
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred:", error.message);
      } else {
        console.log("Email sent successfully!");
      }
    });
  } catch (e) {
    throw Error(e);
  }
}

module.exports = sendMail;
