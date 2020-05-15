const nodemailer = require('nodemailer');
require('dotenv').config();

async function main() {
	let testAccount = await nodemailer.createTestAccount();

	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, 
		auth: {
		  user: testAccount.user, 
		  pass: testAccount.pass
		}
	  });

	return transporter;
}

module.exports = main;