'use strict';

require('dotenv').config();
const user = require('../models/user');
const movielist = require('../models/user_movielist')
const axios = require('axios');
const apiUrl = 'https://api.themoviedb.org/3/';
const APIKEY = process.env.API_KEY

const numGenTo10 = () => {
  return Math.floor(Math.random() * 11)
}

const numGenTo100 = () => {
  return Math.floor(Math.random() * 101)
}

const numGenTo1000 = () => {
  return Math.floor(Math.random() * 1001)
}

const duplicateCheck = (num, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === num) return false;
  }
  return true;
}

const onLoadArrayGen = () => {
  const arr = [1, 2, 3];
  while (arr.length < 6) {
    let num = numGenTo10();
    const check = duplicateCheck(num, arr);
    if (check) {
      arr.push(num);
    }
  }
  while (arr.length < 8) {
    let num = numGenTo100();
    const check = duplicateCheck(num, arr);
    if (check) {
      arr.push(num);
    }
  }
  while (arr.length < 10) {
    let num = numGenTo1000();
    const check = duplicateCheck(num, arr);
    if (check) {
      arr.push(num);
    }
  }
  return arr;
}

const directorCheck = async (arr, movieid, userRating) => {
  try {
    let directorName = '';
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].job === 'Director') {
        directorName = arr[i].name;
      }
    }
    return [{
      movid: movieid,
      name: directorName,
      rating: userRating
    }];
  } catch (e) {
    console.error('directorCheck is failing');
  }
};

const actorCheck = async (arr, movieid, userRating) => {
  try {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].order === 0 || arr[i].order === 1 || arr[i].order === 2 ) {
        result.push({
          movid: movieid,
          name: arr[i].name,
          rating: userRating
        });
      }
    }
    return result;
  } catch (e) {
    console.error('actorCheck is failing');
  }
};

const getMovieWithCredits = async (id) => {
  try {
    const movie = await axios.get(`${apiUrl}movie/${id}?api_key=${APIKEY}&append_to_response=credits`)
    return movie;
  } catch (e) {
    console.error('getMovieWithCredits is failing');
  }
};

const onLoad = async (req, res) => {
  try {
    const arr = onLoadArrayGen()
    const finalResponse = [];
    for (let i = 0; i < arr.length; i++) {
      // check out for ... await might need promise.all
      const apiResponse = await axios.get(`${apiUrl}trending/movie/day?api_key=${APIKEY}&page=${arr[i]}`);
      finalResponse.push(apiResponse.data.results);
    }
    // add genre actor director lists if they exist in db here
    // will need to check all against db
    res.status(200);
    res.send(finalResponse);
  } catch (e) {
    console.error("onLoad is failing");
    res.status(500);
  }
};

const addWatchlist = async (req, res) => {
  try {
    const id = req.body.id;
    const filter = { email: req.session.userEmail };
    const movie = await getMovieWithCredits(id);
    movie.data.seen = false;
    movie.data.user_rating = null;
    const genres = movie.data.genres;
    for (let i = 0; i < genres.length; i++) {
      genres[i].rating = null;
      genres[i].movid = id;
    }
    const crew = movie.data.credits.crew;
    const director = await directorCheck(crew, id, null);
    const cast = movie.data.credits.cast;
    const actor = await actorCheck(cast, id, null);
    let update = await movielist.findOneAndUpdate(filter, {
      $push: {
        movielist: [movie.data],
        genres: genres,
        directors: director,
        actors: actor
    }
    });
    update = await movielist.findOne(filter);
    res.status(200);
    res.send(update);
  } catch (e) {
    console.error("addWatchlist is failing");
    res.status(500);
  }
};

const addWatched = async (req, res) => {
  try {
    const movieid = req.body.id;
    const userRating = req.body.user_rating;
    const userList = await movielist.findOne({ email: req.session.userEmail });
    let inDB = false;
    for (let i = 0; i < userList.movielist.length; i++) {
      console.log(userList.movielist[i].id, 'user');
      if (userList.movielist[i].id === movieid) {
        inDB = true;
      }
    }
    console.log(inDB, 'indb')
    if (inDB === true) {
      // delete from DB then run the rest of the function
    }
    const movie = await getMovieWithCredits(movieid);
    movie.data.seen = true;
    movie.data.user_rating = userRating;
    const genres = movie.data.genres;
    for (let i = 0; i < genres.length; i++) {
      genres[i].rating = userRating;
      genres[i].movid = movieid;
    }
    const crew = movie.data.credits.crew;
    const director = await directorCheck(crew, movieid, userRating);
    const cast = movie.data.credits.cast;
    const actor = await actorCheck(cast, movieid, userRating);
    let update = await movielist.findOneAndUpdate({ email: req.session.userEmail }, {
      $push: {
        movielist: [movie.data],
        genres: genres,
        directors: director,
        actors: actor
      }
    });
    update = await movielist.findOne({ email: req.session.userEmail });
    res.status(200);
    res.send(update);
  } catch (e) {
    console.error("addWatched is failing");
    res.status(500);
  }
};

module.exports = { onLoad, addWatchlist, addWatched };