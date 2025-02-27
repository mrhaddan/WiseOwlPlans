const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const User = require('../models/user');

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
        to: "nickwiseowl@gmail.com", // list of receivers
        subject: `Message from ${mail.name}`,
        text: mail.message,
        html: `<p><b>From:</b> ${mail.name}<br>
            <b>Email:</b> ${mail.email}<br>
            <b>Phone:</b> ${mail.phone}<br>
            <b>Message:</b> ${mail.message}</p>`
    });
}

router.use(methodOverride('_method'));

// home page
router.get('/', (req, res) => {
    const title = 'Home';
    console.log(title);
    res.render('home', { title });
});

// contact page
router.get('/contact', (req, res) => {
    console.log('contact');
    const title = 'Contact Us';
    res.render('contact', {title, messages: req.flash('info')});
})

// Route for viewing all plans
router.get('/plans', async (req, res) => {
    const title = 'Plans';
    const plans = await Plan.find().limit(10);
    res.render('plans', {plans, title});
});

// Plan detail page
router.get('/plans/:id', async (req, res, next) => {
    const title = 'Plan Detail'
    const p = await Plan.findById(req.params.id);
    res.render('show', {p, title});
})

//logic for contact form
router.post('/mailer', (req, res) => {
    try {
        const mail = req.body.contact;
        console.log(mail);
        sendEmail(mail);
        req.flash('info', 'Contact form submitted');
        res.redirect('/contact');
    } catch (error) {
        req.flash('info', 'Something went wrong');
        res.redirect('/contact');
    }
    
    
})

router.get('/admin/build', (req, res) => {
    const title = 'New Plan';
    res.render('admin/build', {title});
});

//POST
router.post('/plans', async (req, res, next) => {
    const title = 'Plans'
    console.log('Posted bruh');
    console.log(req.body.plan);
    //await plan.save();
    res.redirect('/');
})

// temporary route
router.get('/fakeUser', async (req, res) => {
    const user = new User({email: 'nick.haddan@gmail.com', username: 'nickkkk'});
    const newUser = await User.register(user, 'chicken');
    res.send(newUser);
})

// Register form - GET

module.exports = router;