const nodemailer = require('nodemailer');
const debug = require('debug')('sendMail');

const sendMail = async function (email, sub, message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.CDUPROPSMAIL,
      pass: process.env.CDUPROPSMAILPASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  debug(email);
  debug(sub);
  debug(message);

  const mailOptions = {
    from: 'cduprops',
    to: email,
    subject: sub,
    html: message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      debug('error ', err);
    } else {
      debug('info ', info);
    }
  });
};

module.exports = sendMail;
