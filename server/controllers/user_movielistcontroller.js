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

const directorCheck = async (arr) => {
  try {
    let directorName = '';
    let directorRating = null;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].job === 'Director') {
        directorName = arr[i].name;
      }
    }
    return [{
      name: directorName,
      rating: directorRating
    }];
  } catch (e) {
    console.error('directorCheck is failing');
    res.status(500);
  }
};

const actorCheck = async (arr) => {
  try {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].order === 0 || arr[i].order === 1 || arr[i].order === 2 ) {
        result.push({
          name: arr[i].name,
          rating: null
        });
      }
    }
    return result;
  } catch (e) {
    console.error('actorCheck is failing');
    res.status(500);
  }
};

const getMovieWithCredits = async (id) => {
  try {
    const movie = await axios.get(`${apiUrl}movie/${id}?api_key=${APIKEY}&append_to_response=credits`)
    return movie;
  } catch (e) {
    console.error('getMovieWithCredits is failing');
    res.status(500);
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
    const crew = movie.data.credits.crew;
    const director = await directorCheck(crew);
    const cast = movie.data.credits.cast;
    const actor = await actorCheck(cast);
    const newdata = {
      movielist: [movie.data],
      genres: movie.data.genres,
      directors: director,
      actors: actor
    }
    console.log(newdata, 'data')
    // let update = await movielist.findOneAndUpdate(filter, newdata);
    let update = await movielist.findOneAndUpdate(filter, newdata);
    update = await movielist.findOne(filter);
    res.status(200);
    res.send(update);
  } catch (e) {
    console.error("addWatchlist is failing");
    res.status(500);
  }
};

module.exports = { onLoad, addWatchlist};