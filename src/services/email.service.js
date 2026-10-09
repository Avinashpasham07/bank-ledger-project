require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"backend-Bank" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail,name){
    const subject = `welcome ${name}`
    const text = `hello ${name} from backend-bank,\n\n thanks for joing our bank. we are happy to have you in our family.\n\nThankyou,`
    const html = `<p>hello ${name} from backend-bank,<p>
    <p>thanks for joing our bank. we are happy to have you in our family.</p>
    <p>Thankyou,</p>`
    
    await sendEmail(userEmail,subject,text,html)
}

async function sendLoginEmail(userEmail,name){
    const subject = `New Login Alert - Welcome Back! ${name}`
    const text = `hello ${name} from backend-bank,\n\nWe noticed a new login to your account. If this was you, you can safely ignore this email. If not, please secure your account.\n\nThankyou,`
    const html = `<p>hello ${name} from backend-bank,</p>
    <p>We noticed a new login to your account. If this was you, you can safely ignore this email. If not, please secure your account.</p>
    <p>Thankyou,</p>`
    
    await sendEmail(userEmail,subject,text,html)
}
async function sendBirthdayEmail(userEmail, name) {
    const subject = `Happy Birthday ${name}!`;
    const text = `Hello ${name} from backend-bank,\n\nWe want to wish you a very Happy Birthday! We hope you have a wonderful day and a prosperous year ahead.\n\nBest wishes,`;
    const html = `<p>Hello ${name},</p>
    <p>We at backend-bank want to wish you a very <strong>Happy Birthday!</strong> We hope you have a wonderful day.</p>
    <p>Best wishes,</p>`;
    
    await sendEmail(userEmail, subject, text, html);
}

async function sendAccountAnniversaryEmail(userEmail, name, years) {
    const subject = `Happy Account Anniversary, ${name}!`;
    const text = `Hello ${name} from backend-bank,\n\nThank you for being with us for ${years} year(s)! We appreciate your loyalty and trust in us.\n\nThank you,`;
    const html = `<p>Hello ${name},</p>
    <p>Thank you for being with backend-bank for <strong>${years} year(s)!</strong> We appreciate your loyalty and trust in us.</p>
    <p>Thank you,</p>`;
    
    await sendEmail(userEmail, subject, text, html);
}

module.exports = {
    sendRegistrationEmail,
    sendLoginEmail,
    sendBirthdayEmail,
    sendAccountAnniversaryEmail
}