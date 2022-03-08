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
router.post('/home', user_movielist.onLoad);
router.post('/home/watchlist', user_movielist.addWatchlist);
router.post('/home/watched', user_movielist.addWatched);
router.delete('/home', user_movielist.deleteMovie);
router.post('/home', user.logoutUser);

//from watchlist page
router.post('/watchlist', user_movielist.onLoadWatchlist);
router.post('/watchlist/watched', user_movielist.addWatched);
router.delete('/watchlist', user_movielist.deleteMovie);
router.post('/watchlist', user.logoutUser);

//from watched page
router.post('/watched', user_movielist.onLoadWatched);
router.delete('/watched', user_movielist.deleteMovie);
router.post('/watched', user.logoutUser);

//from collections page
router.post('/collections', user_collection.onLoadCollections);
router.post('/collections/addactor', user_collection.addActorCollection);
router.post('/collections/adddirector', user_collection.addDirectorCollection);
router.post('/collections/watchlist', user_movielist.addWatchlist);
router.post('/collections/watched', user_movielist.addWatched);
router.delete('/collections/collection', user_collection.deleteCollection);
router.delete('/collections', user_movielist.deleteMovie);
router.post('/collections', user.logoutUser);

module.exports = router;