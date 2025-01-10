const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');
const methodOverride = require('method-override');
const dotenv = require('dotenv');

dotenv.config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: 'smtp.gmail.com',
    port: 465 ,
    secure: true,
    auth: {
        user: process.env.email,
        pass: process.env.GmailPass,
    }
});

async function sendEmail(mail){
    await transporter.sendMail({
        from: mail.email, // sender address
        to: "nick@wiseowlplans.com", // list of receivers
        subject: `Message from ${mail.name}`,
        text: mail.message,
        html: `<p><b>From:</b> ${mail.name}<br>
            <b>Email:</b> ${mail.email}<br>
            <b>Phone:</b> ${mail.phone}<br>
            <b>Message:</b> ${mail.message}</p>`
    });
}

router.use(methodOverride('_method'));

router.get('/', (req, res) => {
    const title = 'Home';
    console.log(title);
    res.render('home', { title });
});

router.get('/contact', (req, res) => {
    console.log('contact');
    const title = 'Contact Us';
    res.render('contact', {title});
})

router.get('/plans', async (req, res) => {
    const title = 'Plans';
    const plan = await Plan.find().limit(10);
    res.render('plans', {plan, title});
});

router.post('/mailer', (req, res) => {
    const mail = req.body.contact;
    console.log(mail);
    sendEmail(mail);
    res.redirect('/');
})

module.exports = router;