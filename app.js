const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const ejsMate = require('ejs-mate');
const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: 'smtp.gmail.com',
    port: 465  ,
    secure: true,
    auth: {
        user: 'nickwiseowl@gmail.com',
        pass: process.env.GmailPass,
    }
});

async function main() {
    // send mail with defined transport object
    const mailOptions = await transporter.sendMail({
        from: ' "Wise Owl Plans" <nick@wiseowlplans.com>', // sender address
        to: "nick@wiseowlplans.com", // list of receivers
        subject: "Hello",
        text: "This is a test?",
        html: "<b>Hello World?</b>"
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.error("error sending email: ", error);
        } else{ 
            console.log("Email sent: ", info.response);
        }
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

app.get('/contact', (req, res) => {
    const title = 'Contact Us';
    res.render('contact', {title});
})

app.all('*', (req, res, next) => {
    const title = 'Error 404';
    res.render('404', { title });
})