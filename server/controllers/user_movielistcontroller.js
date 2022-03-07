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

const numGenTo18 = () => {
  return Math.floor(Math.random() * 18)
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

const onLoadArray = () => {
  const arr = [1, 2, 3];
  while (arr.length < 6) {
    let num = numGenTo10();
    const check = duplicateCheck(num, arr);
    if (check && num !== 0) {
      arr.push(num);
    }
  }
  while (arr.length < 8) {
    let num = numGenTo100();
    const check = duplicateCheck(num, arr);
    if (check && num !== 0) {
      arr.push(num);
    }
  }
  while (arr.length < 10) {
    let num = numGenTo1000();
    const check = duplicateCheck(num, arr);
    if (check && num !== 0) {
      arr.push(num);
    }
  }
  return arr;
}

const directorCheck = async (arr, movieid, userRating) => {
  try {
    let directorName = '';
    let directorID;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].job === 'Director') {
        directorName = arr[i].name;
        directorID = arr[i].id;
      }
    }
    return [{
      movid: movieid,
      id: directorID,
      name: directorName,
      rating: userRating
    }];
  } catch (e) {
    console.error(e, 'directorCheck is failing');
  }
};

const actorCheck = async (arr, movieid, userRating) => {
  try {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].order === 0 || arr[i].order === 1 || arr[i].order === 2 ) {
        result.push({
          movid: movieid,
          id: arr[i].id,
          name: arr[i].name,
          rating: userRating
        });
      }
    }
    return result;
  } catch (e) {
    console.error(e, 'actorCheck is failing');
  }
};

const getMovieWithCredits = async (id) => {
  try {
    const movie = await axios.get(`${apiUrl}movie/${id}?api_key=${APIKEY}&append_to_response=credits`)
    return movie;
  } catch (e) {
    console.error(e, 'getMovieWithCredits is failing');
  }
};

const genreSort = async (userEmail) => {
  try {
    const filter = await movielist.findOne({
      email: userEmail
    });
    const genresNull = filter.genres;
    const genres = genresNull.filter(genre => genre.rating)
    if (genres === []) return false;
    const genreArray = [{
      name: genres[0].name,
      id: genres[0].id,
      rating: genres[0].rating,
      count: 1
    }];
    for (let i = 1; i < genres.length; i++) {
      let len = genreArray.length;
      for (let j = 0; j < len; j++) {
        if (genres[i].name === genreArray[j].name) {
          genreArray[j].rating = genreArray[j].rating + genres[i].rating;
          genreArray[j].count++
          if (i < genres.length - 1) {
            continue;
          }
          else {
            return genreArray;
          }
        } if (genres[i].name !== genreArray[j].name && j === (len - 1)) {
          genreArray.push({
            name: genres[i].name,
            id: genres[i].id,
            rating: genres[i].rating,
            count: 1
          });
        }
      }
    }
    return genreArray;
  } catch (e) {
    console.error(e, 'genreSort is failing');
  }
};

const directorSort = async (userEmail) => {
  try {
    const filter = await movielist.findOne({
      email: userEmail
    });
    const directorsNull = filter.directors;
    const directors = directorsNull.filter(director => director.rating);
    if (directors === []) return false;
    const directorArray = [{
      name: directors[0].name,
      id: directors[0].id,
      rating: directors[0].rating,
      count: 1
    }];

    for (let i = 1; i < directors.length; i++) {
      let len = directorArray.length;
      for (let j = 0; j < len; j++) {
        if (directors[i].name === directorArray[j].name) {
          directorArray[j].rating = directorArray[j].rating + directors[i].rating;
          directorArray[j].count++
          if (i < directors.length - 1) {
            continue;
          }
          else {
            return directorArray;
          }
        } if (directors[i].name !== directorArray[j].name && j === (len - 1)) {
          directorArray.push({
            name: directors[i].name,
            id: directors[i].id,
            rating: directors[i].rating,
            count: 1
          });
        }
      }
    }
    return directorArray;
  } catch (e) {
    console.error(e, 'directorSort is failing');
  }
};

const actorSort = async (userEmail) => {
  try {
    const filter = await movielist.findOne({
      email: userEmail
    });
    const actorsNull = filter.actors;
    const actors = actorsNull.filter(actor => actor.rating);
    if (actors === []) return false;
    const actorArray = [{
      name: actors[0].name,
      id: actors[0].id,
      rating: actors[0].rating,
      count: 1
    }];

    for (let i = 1; i < actors.length; i++) {
      let len = actorArray.length;
      for (let j = 0; j < len; j++) {
        if (actors[i].name === actorArray[j].name) {
          actorArray[j].rating = actorArray[j].rating + actors[i].rating;
          actorArray[j].count++
          if (i < actors.length - 1) {
            continue;
          }
          else {
            return actorArray;
          }
        } if (actors[i].name !== actorArray[j].name && j === (len - 1)) {
          actorArray.push({
            name: actors[i].name,
            id: actors[i].id,
            rating: actors[i].rating,
            count: 1
          });
        }
      }
    }
    return actorArray;
  } catch (e) {
    console.error(e, 'actorSort is failing');
  }
};

const genreIDlist = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37];

const onLoadArrayGenreNoDB = async () => {
  try {
    const arr = [];
    const finalResponse = [];
    while (arr.length < 3) {
      let num = numGenTo18();
      const check = duplicateCheck(num, arr);
      if (check) {
        arr.push(num);
      }
    }
    const genreIDArr = [];
    for (let i = 0; i < arr.length; i++) {
      genreIDArr.push(genreIDlist[arr[i]]);
    }
    for (let i = 0; i < genreIDArr.length; i++) {
      const apiResponse = await axios.get(`${apiUrl}discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreIDArr[i]}`);
      finalResponse.push(apiResponse.data.results);
    }
    return finalResponse;
  } catch (e) {
    console.error(e, "onLoadArrayGenreNoDB is failing");
  }
}

const onLoadDirectorNoDB = async () => {
  try {
    const arr = [55934, 488, 1032, 138, 578, 1223, 525, 108];
    const finalArr = []
    const finalResponse = [];
    while (finalArr.length < 2) {
      let num = Math.floor(Math.random() * 8);
      const check = duplicateCheck(arr[num], finalArr);
      if (check) {
        finalArr.push(arr[num]);
      }
    }
    for (let i = 0; i < finalArr.length; i++) {
      const apiResponse = await axios.get(`${apiUrl}person/${finalArr[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
      const array = apiResponse.data.crew;
      const filteredArray = array.filter(director => director.job === 'Director')
      filteredArray.sort(function (a, b) {
        return b.popularity - a.popularity
      })
      finalResponse.push(filteredArray);
    }
    return finalResponse;
  } catch (e) {
    console.error(e, "onLoadDirectorNoDB is failing");
  }
}

const onLoadActorNoDB = async () => {
  try {
    const arr = [287, 1283, 71580, 1136406, 62, 6193, 3896, 31, 2888, 505710, 18918, 10859, 1245, 139, 204, 1813, 83002, 18973];
    const finalArr = []
    const finalResponse = [];
    while (finalArr.length < 2) {
      let num = Math.floor(Math.random() * 18);
      const check = duplicateCheck(arr[num], finalArr);
      if (check) {
        finalArr.push(arr[num]);
      }
    }
    for (let i = 0; i < finalArr.length; i++) {
      const apiResponse = await axios.get(`${apiUrl}person/${finalArr[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
      const array = apiResponse.data.cast;
      array.sort(function (a, b) {
        return b.popularity - a.popularity
      })
      finalResponse.push(array);
    }
    return finalResponse;
  } catch (e) {
    console.error(e, "onLoadDirectorNoDB is failing");
  }
}

const onLoadArrayGenreWithDB = async (array) => {
  try {
    const page = 1;
    const max = array;
    max.sort(function (a, b) {
      return b.count - a.count
    })
    const newmax = max.slice(0, 3);
    const highest = array;
    highest.sort(function (a, b) {
      return (b.rating / b.count) - (a.rating / a.count)
    })
    const newhighest = highest.slice(0, 3)
    const random = Math.floor(Math.random() * 3)
    let maxGenre = newmax[random].id
    if (!maxGenre) maxGenre = array[0].id
    let maxHighest = newhighest[random].id
    if (!maxHighest) maxHighest = array[0].id
    if (maxHighest === maxGenre) maxHighest = array[1].id
    let genreArray = [maxGenre, maxHighest];
    const finalResponse = [];
    while (genreArray.length < 3) {
      let num = numGenTo18();
      let randomGenre = genreIDlist[num];
      const check = duplicateCheck(randomGenre, genreArray);
      if (check) {
        genreArray.push(randomGenre);
      }
    }
    for (let i = 0; i < genreArray.length; i++) {
      const apiResponse = await axios.get(`${apiUrl}discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreArray[i]}`);
      finalResponse.push(apiResponse.data.results);
    }
    return finalResponse;
  } catch (e) {
    console.error(e, "onLoadArrayGenreWithDB is failing");
  }
}

const onLoadArrayDirectorWithDB = async (array) => {
  try {
    let directorArray = [];
    const finalResponse = [];
    const max = array;
    if (max.length >= 2) {
      max.sort(function (a, b) {
        return b.count - a.count
      })
      const newmax = max.slice(0, 3);
      const highest = array;
      highest.sort(function (a, b) {
        return (b.rating / b.count) - (a.rating / a.count)
      })
      const newhighest = highest.slice(0, 3)
      const random = Math.floor(Math.random() * 3)
      let maxDirector = newmax[random].id
      if (!maxDirector) maxDirector = array[0].id
      let directorHighest = newhighest[random].id
      if (!directorHighest) directorHighest = array[0].id
      if (directorHighest === maxDirector) directorHighest = array[1].id;
      directorArray = [maxDirector, directorHighest];
    }
    else {
      const arr = [55934, 488, 1032, 138, 578, 1223, 525, 108];
      directorArray = array;
      while (directorArray.length < 2) {
        let num = Math.floor(Math.random() * 8);
        const check = duplicateCheck(arr[num], directorArray);
        if (check) {
          directorArray.push(arr[num]);
        }
      }
    }
    for (let i = 0; i < directorArray.length; i++) {
      const apiResponse = await axios.get(`${apiUrl}person/${directorArray[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
      const array = apiResponse.data.crew;
      const filteredArray = array.filter(director => director.job === 'Director')
      filteredArray.sort(function (a, b) {
        return b.popularity - a.popularity
      })
      finalResponse.push(filteredArray);
    }
    return finalResponse;
  } catch (e) {
    console.error(e, "onLoadArrayDirectorWithDB is failing");
  }
};

const onLoadArrayActorWithDB = async (array) => {
  try {
    let actorArray = [];
    const finalResponse = [];
    const max = array;
    if (max.length >= 2) {
      max.sort(function (a, b) {
        return b.count - a.count
      })
      const newmax = max.slice(0, 3);
      const highest = array;
      highest.sort(function (a, b) {
        return (b.rating / b.count) - (a.rating / a.count)
      })
      const newhighest = highest.slice(0, 3)
      const random = Math.floor(Math.random() * 3)
      let maxActor = newmax[random].id
      if (!maxActor) maxActor = array[0].id
      let actorHighest = newhighest[random].id
      if (!actorHighest) actorHighest = array[0].id
      if (actorHighest === maxActor) actorHighest = array[1].id;
      actorArray = [maxActor, actorHighest];
    }
    else {
      const arr = [287, 1283, 71580, 1136406, 62, 6193, 3896, 31, 2888, 505710, 18918, 10859, 1245, 139, 204, 1813, 83002, 18973];
      actorArray = array;
      while (actorArray.length < 2) {
        let num = Math.floor(Math.random() * 18);
        const check = duplicateCheck(arr[num], actorArray);
        if (check) {
          actorArray.push(arr[num]);
        }
      }
    }
    for (let i = 0; i < actorArray.length; i++) {
      const apiResponse = await axios.get(`${apiUrl}person/${actorArray[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
      const array = apiResponse.data.cast;
      array.sort(function (a, b) {
        return b.popularity - a.popularity
      })
      finalResponse.push(array);
    }
    return finalResponse;
  } catch (e) {
    console.error(e, "onLoadArrayDirectorWithDB is failing");
  }
}

const findFaveGenre = (user, max) => {
  const genres = user.genres;
  const faves = [];
  for (let i = 0; i < genres.length; i++) {
    if (genres[i].rating === max) {
      faves.push(genres[i].id);
    }
  }
  return faves;
}

const findFaveDirector = (user, max) => {
  const directors = user.directors;
  const faves = [];
  for (let i = 0; i < directors.length; i++) {
    if (directors[i].rating === max) {
      faves.push(directors[i].id);
    }
  }
  return faves;
}

const findFaveActor = (user, max) => {
  const actors = user.actors;
  const faves = [];
  for (let i = 0; i < actors.length; i++) {
    if (actors[i].rating === max) {
      faves.push(actors[i].id);
    }
  }
  return faves;
}

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

const checkIfInDB = (userDB, array) => {
  let match;
  for (let i = 0; i < userDB.length; i++) {
    for (let j = 0; j < array.length; j++) {
      for (let k = 0; k < array[j].length; k++) {
        if (userDB[i].id === array[j][k].id) {
          array[j][k].inWatchlist = userDB[i].inWatchlist;
          array[j][k].seen = userDB[i].seen;
          array[j][k].user_rating = userDB[i].user_rating
        }
      }
    }
  }
}

const onLoad = async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const arr = onLoadArray();
    const finalResponse = [];
    for (let i = 0; i < arr.length; i++) {
      const apiResponse = await axios.get(`${apiUrl}trending/movie/day?api_key=${APIKEY}&page=${arr[i]}`);
      finalResponse.push(apiResponse.data.results);
    }
    const genre = await genreSort(userEmail);
    let genreIDArr;
    if (genre === undefined) {
      genreIDArr = await onLoadArrayGenreNoDB();
    }
    if (genre) {
      genreIDArr = await onLoadArrayGenreWithDB(genre);
    }
    finalResponse.push(genreIDArr);
    const director = await directorSort(userEmail);
    let directorIDArr;
    if (director === undefined) {
      directorIDArr = await onLoadDirectorNoDB();
    }
    if (director) {
      directorIDArr = await onLoadArrayDirectorWithDB(director);
    }
    finalResponse.push(directorIDArr);
    const actor = await actorSort(userEmail);
    let actorIDArr;
    if (actor === undefined) {
      actorIDArr = await onLoadActorNoDB();
    }
    if (actor) {
      actorIDArr = await onLoadArrayActorWithDB(actor);
    }
    finalResponse.push(actorIDArr);
    const user = await movielist.findOne({
      email: userEmail
    });
    checkIfInDB(user.movielist, finalResponse)
    res.status(200);
    res.send(finalResponse);
  } catch (e) {
    console.error(e, "onLoad is failing");
    res.status(500);
  }
};

const onLoadWatchlist = async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const user = await movielist.findOne({ email: userEmail });
    const userMovies = user.movielist
    const watchlistMovies = userMovies.filter(movie => movie.seen === false);
    const watchedMovies = userMovies.filter(movie => movie.seen === true);
    const finalResponse = [];
    if (watchlistMovies.length > 0) {
      finalResponse.push(watchlistMovies);
    }
    if (watchedMovies.length > 0) {
      let max = 0;
      for (let i = 0; i < watchedMovies.length; i++) {
        if (watchedMovies[i].user_rating >= max) {
          max = watchedMovies[i].user_rating
        }
      }
      const genres = findFaveGenre(user, max);
      const shuffleGenres = shuffle(genres);
      const faveGenres = shuffleGenres.slice(0, 2);
      for (let i = 0; i < faveGenres.length; i++) {
        const apiResponse = await axios.get(`${apiUrl}discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${faveGenres[i]}`);
        finalResponse.push(apiResponse.data.results);
      }
      const directors = findFaveDirector(user, max);
      const shuffleDirectors = shuffle(directors);
      const faveDirectors = shuffleDirectors.slice(0, 2);
      for (let i = 0; i < faveDirectors.length; i++) {
        const apiResponse = await axios.get(`${apiUrl}person/${faveDirectors[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
        const array = apiResponse.data.cast;
        array.sort(function (a, b) {
          return b.popularity - a.popularity
        })
        finalResponse.push(array);
      }
      const actors = findFaveActor(user, max);
      const shuffleActors = shuffle(actors)
      const faveActors = shuffleActors.slice(0, 2);
      for (let i = 0; i < faveActors.length; i++) {
        const apiResponse = await axios.get(`${apiUrl}person/${faveActors[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
        const array = apiResponse.data.cast;
        array.sort(function (a, b) {
          return b.popularity - a.popularity
        })
        finalResponse.push(array);
      }
    }
    if (watchedMovies.length === 0) {
      const arr = onLoadArray();
      for (let i = 0; i < arr.length; i++) {
        const apiResponse = await axios.get(`${apiUrl}trending/movie/day?api_key=${APIKEY}&page=${arr[i]}`);
        finalResponse.push(apiResponse.data.results);
      }
    }
    checkIfInDB(userMovies, finalResponse)
    res.status(200);
    res.send(finalResponse);
  } catch (e) {
    console.error(e, "onLoadWatchlist is failing");
    res.status(500);
  }
};

const onLoadWatched = async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const user = await movielist.findOne({ email: userEmail });
    const userMovies = user.movielist
    const watchedMovies = userMovies.filter(movie => movie.seen === true);
    const finalResponse = [];

    if (watchedMovies.length > 0) {
      finalResponse.push(watchedMovies);
      let max = 0;
      for (let i = 0; i < watchedMovies.length; i++) {
        if (watchedMovies[i].user_rating >= max) {
          max = watchedMovies[i].user_rating
        }
      }
      const genres = findFaveGenre(user, max);
      const shuffleGenres = shuffle(genres);
      const faveGenres = shuffleGenres.slice(0, 2);
      for (let i = 0; i < faveGenres.length; i++) {
        const apiResponse = await axios.get(`${apiUrl}discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${faveGenres[i]}`);
        finalResponse.push(apiResponse.data.results);
      }
      const directors = findFaveDirector(user, max);
      const shuffleDirectors = shuffle(directors);
      const faveDirectors = shuffleDirectors.slice(0, 2);
      for (let i = 0; i < faveDirectors.length; i++) {
        const apiResponse = await axios.get(`${apiUrl}person/${faveDirectors[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
        const array = apiResponse.data.cast;
        array.sort(function (a, b) {
          return b.popularity - a.popularity
        })
        finalResponse.push(array);
      }
      const actors = findFaveActor(user, max);
      const shuffleActors = shuffle(actors)
      const faveActors = shuffleActors.slice(0, 2);
      for (let i = 0; i < faveActors.length; i++) {
        const apiResponse = await axios.get(`${apiUrl}person/${faveActors[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
        const array = apiResponse.data.cast;
        array.sort(function (a, b) {
          return b.popularity - a.popularity
        })
        finalResponse.push(array);
      }
    }
    checkIfInDB(userMovies, finalResponse)
    res.status(200);
    res.send(finalResponse);
  } catch (e) {
    console.error(e, "onLoadWatchlist is failing");
    res.status(500);
  }
};

const addWatchlist = async (req, res) => {
  try {
    const id = req.body.id;
    const filter = { email: req.session.userEmail };
    const movie = await getMovieWithCredits(id);
    movie.data.inWatchlist = true;
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
    console.error(e, "addWatchlist is failing");
    res.status(500);
  }
};

const addWatched = async (req, res) => {
  try {
    const movieid = req.body.id;
    const userRating = req.body.user_rating;
    const userEmail = req.session.userEmail;
    const userList = await movielist.findOne({ email: userEmail });
    let inDB = false;
    for (let i = 0; i < userList.movielist.length; i++) {
      if (userList.movielist[i].id === movieid) {
        inDB = true;
      }
    }
    if (inDB === true) {
      const filter = await movielist.updateOne({
        email: userEmail
      }, { $pull: { movielist: { id: movieid } } });
      const genreFilter = await movielist.updateMany({
        email: userEmail
      }, { $pull: { genres: { movid: movieid } } });
      const actorFilter = await movielist.updateMany({
        email: userEmail
      }, { $pull: { actors: { movid: movieid } } });
      const directorFilter = await movielist.updateMany({
        email: userEmail
      }, { $pull: { directors: { movid: movieid } } });
    }
    const movie = await getMovieWithCredits(movieid);
    movie.data.inWatchlist = false;
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
    let update = await movielist.findOneAndUpdate({ email: userEmail }, {
      $push: {
        movielist: [movie.data],
        genres: genres,
        directors: director,
        actors: actor
      }
    });
    update = await movielist.findOne({ email: userEmail });
    res.status(200);
    res.send(update);
  } catch (e) {
    console.error(e, "addWatched is failing");
    res.status(500);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const useremail = req.session.userEmail;
    const movieid = req.body.id;
    const filter = await movielist.updateOne({
      email: useremail
    }, { $pull: {movielist: { id: movieid } } });
    const genreFilter = await movielist.updateMany({
      email: useremail
    }, { $pull: { genres: { movid: movieid } } });
    const actorFilter = await movielist.updateMany({
      email: useremail
    }, { $pull: { actors: { movid: movieid } } });
    const directorFilter = await movielist.updateMany({
      email: useremail
    }, { $pull: { directors: { movid: movieid } } });
    res.status(200);
    res.send(filter);
  }
  catch (e) {
    console.error(e, "deleteMovie is failing");
    res.status(500);
  }
};

module.exports = { onLoad, addWatchlist, addWatched, deleteMovie, onLoadWatchlist, onLoadWatched };