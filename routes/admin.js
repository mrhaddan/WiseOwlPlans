const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');
const catchAsync = require('../utils/catchAsync');

router.get('/build', (req, res) => {
    const title = 'New Plan';
    res.render('admin/build', {title});
})

module.exports = router;