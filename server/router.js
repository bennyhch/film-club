'use strict';

const express = require('express');
const router = express.Router();
const user = require('./controllers/usercontroller');
const user_movielist = require('./controllers/user_movielistcontroller');
const user_collection = require('./controllers/user_collectionscontroller');
const authMiddleware = require('./middlewares/authmiddleware');

//from login page
router.post('/register', user.createUser);
router.post('/', user.loginUser);

//from home page
router.get('/home', authMiddleware, user_movielist.onLoad)
router.post('/home/watchlist', user_movielist.addWatchlist)
router.post('/home/watched', user_movielist.addWatched)
router.post('/home', authMiddleware, user.logoutUser);

//from watchlist page
router.post('/watchlist', user.logoutUser);

//from watched page
router.post('/watched', user.logoutUser);

//from collections page
router.post('/collections', user.logoutUser);

module.exports = router;