const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const ejsMate = require('ejs-mate');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

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


// Sets an almost global path for css and js files
app.use(express.static(path.join(__dirname, '/public')));

// This allows form data to be parsed
app.use(express.urlencoded({ extended: true }));

// This allows json data to be accessed
app.use(express.json());

// start the port to run the web app
app.listen(port, () => {
    console.log('Listening on port 3000');
})

// Set ejs
app.set('view engine', 'ejs');

// Set ejsMate
app.engine('ejs', ejsMate);

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/plans', (req, res) => {

})

app.get('/contact', (req, res) => {
    const title = 'Contact Us';
    res.render('contact', {title});
})

app.post('/mailer', (req, res) => {
    const mail = req.body.contact;
    sendEmail(mail);
    res.redirect('/');
})

app.all('*', (req, res, next) => {
    const title = 'Error 404';
    res.render('404', { title });
})