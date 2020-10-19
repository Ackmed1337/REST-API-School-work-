
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const emailMsg = `Thanks for signing up we have stored your email.`;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = to => {
    const msg = {
        to: to,
        from: process.env.SENT_FROM,
        subject: 'User Signup received',
        text: emailMsg,
        html: emailMsg,
    };
    return sgMail.send(msg);
}

module.exports = {
    sendEmail
}