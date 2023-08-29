require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    SMTP_MAIL_USER: process.env.SMTP_MAIL_USER,
    SMTP_MAIL_PASSWORD: process.env.SMTP_MAIL_PASSWORD,
    SMTP_MAIL_SERVICE: process.env.SMTP_MAIL_SERVICE,
    JWT_SECRET: process.env.JWT_SECRET,
    VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
    VAPID_MAIL_ID: process.env.VAPID_MAIL_ID,
    FRONTEND_URL: process.env.FRONTEND_URL,
    CRYPTO_KEY: process.env.CRYPTO_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET,
    ANALYTICS_MONGO_URL: process.env.ANALYTICS_MONGO_URL,
    // Add other environment variables as needed
};
  