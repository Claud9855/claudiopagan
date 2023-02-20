const {Contacts} = require('../models');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
    async createContacts({body}, res) {
        const contacts = await Contacts.create(body);

        if(!contacts) {
            return res.status(400).json({message: "Unable to create contact."});
        }

        res.status(200).json(contacts);
    },

    async sendEmail({body}, res) {
        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: process.env.EMAIL_ACCT,
                pass: process.env.PASS
            },
            secure: true
        });

        transporter.verify((err, success) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log('Server is reading to take messages');
            }
        });

        const mailData = {
            from: `${body.name} <${body.email_address}>`,
            to: process.env.EMAIL_ACCT,
            subject: `${body.name} <${body.email_address}>`,
            text: body.content
        };

        transporter.sendMail(mailData, (err, data) => {
            if(err) {
                console.log(err);
                res.status(400).json({message: 'Something went wrong...'});
            }
            else {
                res.status(200).json(mailData);
            }
        });
    }
};