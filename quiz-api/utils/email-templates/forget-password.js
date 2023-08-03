const emailVerificationTemplate = ({name, link}) => {
    let template = `<!DOCTYPE html>
    <html>
    <head>
      <title>PollSage Email Verification</title>
      <style>
        /* Add your custom styling here */
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f7f7f7;
        }
        .logo {
          text-align: center;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          background-color: #007BFF;
          color: #ffffff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 4px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <h1>PollSage</h1>
        </div>
        <p>Hi ${name},</p>
        <p>Thank you for registering with PollSage! Please click the button below to verify your email address:</p>
        <p>
          <a href="${link}" class="button">Verify Email</a>
        </p>
        <p>If you did not create an account on PollSage, you can safely ignore this email.</p>
        <div class="footer">
          <p>Best Regards,</p>
          <p>The PollSage Team</p>
        </div>
      </div>
    </body>
    </html>
    `;

    return template;
}

module.exports = emailVerificationTemplate;