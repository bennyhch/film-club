'use strict';

import express from 'express';
import {
  createUser,
  loginUser,
  logoutUser,
} from './controllers/usercontroller';
const router = express.Router();
import {
  addWatched,
  addWatchlist,
  deleteMovie,
  onLoad,
  onLoadWatched,
  onLoadWatchlist,
} from './controllers/user_movielistcontroller';
// import user_collection from "./controllers/user_collectionscontroller";
/* 
  Deal with auth later. 
*/
// import authMiddleware from './middlewares/authmiddleware';

//from login page
router.post('/register', createUser);
router.post('/', loginUser);
router.post('/logout', logoutUser);

//from home page
router.post('/home', onLoad);
router.post('/home/watchlist', addWatchlist);
router.post('/home/watched', addWatched);
router.delete('/home', deleteMovie);

//from watchlist page
router.post('/watchlist', onLoadWatchlist);
router.post('/watchlist/watched', addWatched);
router.delete('/watchlist', deleteMovie);

//from watched page
router.post('/watched', onLoadWatched);
router.delete('/watched', deleteMovie);

//from collections page

/* 
This is not fully implemented yet.
*/

// router.post("/collections", user_collection.onLoadCollections);
// router.post("/collections/addactor", user_collection.addActorCollection);
// router.post("/collections/adddirector", user_collection.addDirectorCollection);
// router.post("/collections/watchlist", user_movielist.addWatchlist);
// router.post("/collections/watched", user_movielist.addWatched);
// router.delete("/collections/collection", user_collection.deleteCollection);
// router.delete('/collections', user_movielist.deleteMovie);
// router.post('/collections', user.logoutUser);

export default router;
