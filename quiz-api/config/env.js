require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    SMTP_MAIL_USER: process.env.SMTP_MAIL_USER,
    SMTP_MAIL_PASSWORD: process.env.SMTP_MAIL_PASSWORD,
    SMTP_MAIL_SERVICE: process.env.SMTP_MAIL_SERVICE,
    JWT_SECRET: process.env.JWT_SECRET,
    // Add other environment variables as needed
};
  