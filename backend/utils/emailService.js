const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create transporter
    // For production, use SendGrid, Mailgun, or AWS SES
    // For dev, we can use Gmail or Ethereal
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or use host/port for other SMTP
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD, // App Password if using Gmail 2FA
        },
    });

    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html, // Optional HTML body
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
