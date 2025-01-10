const express = require('express');
const router = express.Router();
const Campground = require('../models/plans');
const {planSchema} = require('../schemas');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));