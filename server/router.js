'use strict';

const express = require('express');
const router = express.Router();
const user = require('./controllers/usercontroller');

//from login page
router.post('/register', user.createUser);
router.post('/', user.loginUser);

//from home page
router.post('/home', user.logoutUser);

//from watchlist page
router.post('/watchlist', user.logoutUser);

//from watched page
router.post('/watched', user.logoutUser);

//from collections page
router.post('/collections', user.logoutUser);

module.exports = router;