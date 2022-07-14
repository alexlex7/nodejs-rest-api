const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
const sendMail = async (data) => {
  try {
    await sgMail.send({ ...data, from: 'alekslosev7@gmail.com' });
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
