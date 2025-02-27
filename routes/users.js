const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

router.get('/register', (req, res) => {
    const title = 'Register'
    res.render('users/register', {title, messages: req.flash('info')});
})

// POST
router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        res.redirect('../plans');
    } catch (error) {
        req.flash('info', `${error}`);
        res.redirect('/users/register');
    }
}));

module.exports = router;