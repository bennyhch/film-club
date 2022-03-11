"use strict";

import { Request, Response } from "express";

require("dotenv").config();
const user = require("../models/user");
const movielist = require("../models/user_movielist");
const axios = require("axios");
const apiUrl = "https://api.themoviedb.org/3/";
const APIKEY = process.env.API_KEY;

/* 
  TODO Refactor this into one function.
  e.g. random number 1-10
*/
const numGenTo10 = () => {
  return Math.floor(Math.random() * 11);
};

const numGenTo18 = () => {
  return Math.floor(Math.random() * 18);
};

const numGenTo100 = () => {
  return Math.floor(Math.random() * 101);
};

const numGenTo1000 = () => {
  return Math.floor(Math.random() * 1001);
};

/*
  TODO Refactor, in built method.
*/
const duplicateCheck = (num: Number, array: Array<Number>) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === num) return false;
  }
  return true;
};

/**
 *
 * @returns an array of 1,2,3[3 random numbers between 1-10][]
 */
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
};
/**
 *
 * @param {array} arr an array of movies
 * @param {*} movieid movie
 * @param {*} userRating
 * @returns
 */
const directorCheck = async (
  arr: Array<CrewCredit>,
  movieid: number,
  userRating: number | null
): Promise<Array<DirectorRating> | undefined> => {
  try {
    let directorName = "";
    let directorID;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].job === "Director") {
        directorName = arr[i].name;
        directorID = arr[i].id;
      }
    }
    return [
      {
        movid: movieid,
        id: directorID as number,
        name: directorName,
        rating: userRating,
      },
    ];
  } catch (e) {
    console.error(e, "directorCheck is failing");
    return undefined;
  }
};

const actorCheck = async (
  arr: Array<any>,
  movieid: number,
  userRating: number | null
) => {
  try {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].order === 0 || arr[i].order === 1 || arr[i].order === 2) {
        result.push({
          movid: movieid,
          id: arr[i].id,
          name: arr[i].name,
          rating: userRating,
        });
      }
    }
    return result;
  } catch (e) {
    console.error(e, "actorCheck is failing");
  }
};

const getMovieWithCredits = async (
  id: number
): Promise<MovieExtended | undefined> => {
  try {
    const movie = await axios.get(
      `${apiUrl}movie/${id}?api_key=${APIKEY}&append_to_response=credits`
    );
    return movie.data;
  } catch (e) {
    console.error(e, "getMovieWithCredits is failing");
  }
  return undefined;
};
/**
 *
 * @param {string} userEmail
 *
 * - Finds a collection of UserMovieGenres
 * - Collates them into a set of genres.
 *
 * @returns A list of genres
 */

/* 
  TODO: Naming conventions here. Simplify. For loops.
  genres = The genres associated with a user's movielist: [UserGenre]
    - that have a rating of not null.
*/
const genreSort = async (userEmail: String) => {
  try {
    const filter: UserMovieList = await movielist.findOne({
      email: userEmail,
    });
    const genresNull = filter.genres;
    // Get only the genres that have a rating.
    const genres = genresNull.filter((genre) => genre.rating);
    if (genres === []) return false;

    // Set genreArray to first user genre.
    const genreArray: Array<GenreRating> = [
      {
        name: genres[0].name,
        id: genres[0].id,
        rating: genres[0].rating,
        count: 1,
      },
    ];

    /* 
      Collate all similar genres, add together ratings, and update count
      Otherwise add the next genre and set count to one.
    */
    for (let i = 1; i < genres.length; i++) {
      let len = genreArray.length;
      for (let j = 0; j < len; j++) {
        if (genres[i].name === genreArray[j].name) {
          genreArray[j].rating =
            (genreArray[j].rating as number) + genres[i].rating;
          genreArray[j].count++;

          // If it has got to the end of the array. Return it.
          if (i < genres.length - 1) {
            continue;
          } else {
            return genreArray;
          }

          // If the genres match and it is at the last position:
        }
        if (genres[i].name !== genreArray[j].name && j === len - 1) {
          genreArray.push({
            name: genres[i].name,
            id: genres[i].id,
            rating: genres[i].rating,
            count: 1,
          });
        }
      }
    }
    return genreArray;
  } catch (e) {
    console.error(e, "genreSort is failing");
  }
};

/**
 *
 * @param {*} userEmail
 * @returns Similar to above, collates ratings.
 */
const directorSort = async (userEmail: String) => {
  try {
    const filter: UserMovieList = await movielist.findOne({
      email: userEmail,
    });
    const directorsNull = filter.directors;
    const directors = directorsNull.filter((director) => director.rating);
    if (directors === []) return undefined;
    const directorArray: Array<DirectorRating> = [
      {
        name: directors[0].name,
        id: directors[0].id,
        rating: directors[0].rating,
        count: 1,
      },
    ];

    for (let i = 1; i < directors.length; i++) {
      let len = directorArray.length;
      for (let j = 0; j < len; j++) {
        if (directors[i].name === directorArray[j].name) {
          directorArray[j].rating =
            (directorArray[j].rating as number) + directors[i].rating;
          directorArray[j].count = (directorArray[j].count as number) + 1;
          if (i < directors.length - 1) {
            continue;
          } else {
            return directorArray;
          }
        }
        if (directors[i].name !== directorArray[j].name && j === len - 1) {
          directorArray.push({
            name: directors[i].name,
            id: directors[i].id,
            rating: directors[i].rating,
            count: 1,
          });
        }
      }
    }
    return directorArray;
  } catch (e) {
    console.error(e, "directorSort is failing");
  }
};

const actorSort = async (
  userEmail: String
): Promise<Array<ActorRating> | undefined> => {
  try {
    const filter: UserMovieList = await movielist.findOne({
      email: userEmail,
    });
    const actorsNull = filter.actors;
    const actors = actorsNull.filter((actor) => actor.rating);
    if (actors === []) return undefined;
    const actorArray: Array<ActorRating> = [
      {
        name: actors[0].name,
        id: actors[0].id,
        rating: actors[0].rating,
        count: 1,
      },
    ];

    for (let i = 1; i < actors.length; i++) {
      let len = actorArray.length;
      for (let j = 0; j < len; j++) {
        if (actors[i].name === actorArray[j].name) {
          actorArray[j].rating =
            (actorArray[j].rating as number) + actors[i].rating;
          actorArray[j].count++;
          if (i < actors.length - 1) {
            continue;
          } else {
            return actorArray;
          }
        }
        if (actors[i].name !== actorArray[j].name && j === len - 1) {
          actorArray.push({
            name: actors[i].name,
            id: actors[i].id,
            rating: actors[i].rating,
            count: 1,
          });
        }
      }
    }
    return actorArray;
  } catch (e) {
    console.error(e, "actorSort is failing");
  }
};

/* 
  This section is for prepopulating the main page, if the user has not put anything in, to have a default.


*/
const genreIDlist = [
  28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
  53, 10752, 37,
];

const genreIDlookup: any = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const directorsIDlist: any = {
  55934: "Taika Waititi",
  488: "Steven Spielberg",
  1032: "Martin Scorsese",
  138: "Quentin Tarantino",
  578: "Ridley Scott",
  1223: "The Coen Brothers",
  525: "Christopher Nolan",
  108: "Peter Jackson",
};

const actorsIDlist: any = {
  287: "Brad Pitt",
  1283: "Helena Bonham Carter",
  71580: "Benedict Cumberbatch",
  1136406: "Tom Holland",
  62: "Bruce Willis",
  6193: "Leo DiCaprio",
  3896: "Liam Neeson",
  31: "Tom Hanks",
  2888: "Will Smith",
  505710: "Zendaya",
  18918: "Dwayne Johnson",
  10859: "Ryan Reynolds",
  1245: "Scarlett Johansson",
  139: "Uma Thurman",
  204: "Kate Winslet",
  1813: "Anne Hathaway",
  83002: "Jessica Chastain",
  18973: "Mila Kunis",
};

/* 
  TODO remap genre ids to genre names
*/
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

    /* 
      Adds the names of the genres onto the array.
    */
    // for (let i = 0; i < genreIDArr.length; i++) {
    //   const genreName = genreIDlookup[genreIDArr[i]];
    //   finalResponse.push(genreName);
    // }
    for (let i = 0; i < genreIDArr.length; i++) {
      const genreName = genreIDlookup[genreIDArr[i]];
      finalResponse.push({
        genreName: genreName,
        movies: [],
      });
    }

    /* 
      Adds the arrays of movies.
    */
    for (let i = 0; i < genreIDArr.length; i++) {
      const apiResponse = await axios.get(
        `${apiUrl}discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreIDArr[i]}`
      );
      finalResponse[i].movies = apiResponse.data.results;
    }
    return finalResponse;
  } catch (e) {
    console.error(e, "onLoadArrayGenreNoDB is failing");
  }
};

const onLoadDirectorNoDB = async (): Promise<
  Array<NewDirectorList> | undefined
> => {
  try {
    const arr = [55934, 488, 1032, 138, 578, 1223, 525, 108];
    const finalArr = [];
    const finalResponse: Array<NewDirectorList> = [];
    while (finalArr.length < 2) {
      let num = Math.floor(Math.random() * 8);
      const check = duplicateCheck(arr[num], finalArr);
      if (check) {
        finalArr.push(arr[num]);
      }
    }
    for (let i = 0; i < finalArr.length; i++) {
      const directorName = directorsIDlist[finalArr[i]];
      finalResponse.push({
        directorName: directorName,
        movies: [],
      });
    }
    for (let i = 0; i < finalArr.length; i++) {
      const apiResponse = await axios.get(
        `${apiUrl}person/${finalArr[i]}/movie_credits?api_key=${APIKEY}&language=en-US`
      );
      const array: Array<CrewCredit> = apiResponse.data.crew;
      const filteredArray = array.filter(
        (director) => director.job === "Director"
      );
      filteredArray.sort(function (a, b) {
        return b.popularity - a.popularity;
      });
      finalResponse[i].movies = filteredArray;
    }
    return finalResponse;
  } catch (e) {
    console.error(e, "onLoadDirectorNoDB is failing");
  }
  return undefined;
};

const onLoadActorNoDB = async (): Promise<Array<NewActorList> | undefined> => {
  try {
    const arr = [
      287, 1283, 71580, 1136406, 62, 6193, 3896, 31, 2888, 505710, 18918, 10859,
      1245, 139, 204, 1813, 83002, 18973,
    ];
    // finalArr is array of randoms
    const finalArr = [];
    const finalResponse: Array<NewActorList> = [];
    while (finalArr.length < 2) {
      let num = Math.floor(Math.random() * 18);
      const check = duplicateCheck(arr[num], finalArr);
      if (check) {
        finalArr.push(arr[num]);
      }
    }
    for (let i = 0; i < finalArr.length; i++) {
      const actorName = actorsIDlist[finalArr[i]];
      finalResponse.push({
        actorName: actorName,
        movies: [],
      });
    }
    for (let i = 0; i < finalArr.length; i++) {
      const apiResponse = await axios.get(
        `${apiUrl}person/${finalArr[i]}/movie_credits?api_key=${APIKEY}&language=en-US`
      );
      const array: Array<CastCredit> = apiResponse.data.cast;
      array.sort(function (a, b) {
        return b.popularity - a.popularity;
      });
      finalResponse[i].movies = array;
    }
    return finalResponse;
  } catch (e) {
    console.error(e, "onLoadDirectorNoDB is failing");
  }
};

// (async () => {
//   let resp = await onLoadArrayGenreNoDB();
// })();

const onLoadArrayGenreWithDB = async (
  array: Array<GenreRating>,
  user: UserMovieList
) => {
  try {
    const page = 1;
    const max = array;
    max.sort(function (a, b) {
      return b.count - a.count;
    });
    const newmax = max.slice(0, 3);
    const shuffledMax = shuffle(newmax);
    const highest = array;
    highest.sort(function (a, b) {
      return (b.rating as number) / b.count - (a.rating as number) / a.count;
    });
    const newhighest = highest.slice(0, 3);
    const shuffled = shuffle(newhighest);
    let maxGenre = shuffledMax[0].id;
    let maxHighest = shuffled[0].id;
    if (maxHighest === maxGenre) maxHighest = shuffled[1].id;
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
      const genreName = genreIDlookup[genreArray[i]];
      finalResponse.push(genreName);
    }
    for (let i = 0; i < genreArray.length; i++) {
      const apiResponse = await axios.get(
        `${apiUrl}discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreArray[i]}`
      );
      const response = apiResponse.data.results;
      checkIfInDB(user.movielist, response);
      finalResponse.push(response);
    }
    return finalResponse;
  } catch (e) {
    console.error(e, "onLoadArrayGenreWithDB is failing");
  }
};

const onLoadArrayDirectorWithDB = async (
  array: Array<DirectorRating>,
  user: UserMovieList
): Promise<Array<NewDirectorList> | undefined> => {
  try {
    let directorIdArray: Array<number> = [];
    const finalResponse = [];
    const max = array;
    if (max.length >= 2) {
      max.sort(function (a, b) {
        return (b.count as number) - (a.count as number);
      });
      const newmax = max.slice(0, 3);
      const shuffledMax = shuffle(newmax);
      const highest = array;
      highest.sort(function (a, b) {
        return (
          (b.rating as number) / (b.count as number) -
          (a.rating as number) / (a.count as number)
        );
      });
      const newhighest = highest.slice(0, 3);
      const shuffled = shuffle(newhighest);
      let maxDirector = shuffledMax[0].id;
      finalResponse.push({
        directorName: shuffledMax[0].name,
        movies: [],
      });

      let directorHighest = shuffled[0].id;
      directorHighest = shuffled[1].id;
      finalResponse.push({
        directorName:
          maxDirector === directorHighest ? shuffled[1].name : shuffled[0].name,
        movies: [],
      });

      directorIdArray = [maxDirector, directorHighest];
    } else {
      const arr = [55934, 488, 1032, 138, 578, 1223, 525, 108];
      let directorIdArray = [array[0].id];
      while (directorIdArray.length < 2) {
        let num = Math.floor(Math.random() * 8);
        const check = duplicateCheck(arr[num], directorIdArray);
        if (check) {
          directorIdArray.push(arr[num]);
          const directorName = directorsIDlist[arr[num]];
          finalResponse.push(directorName);
        }
      }
    }
    for (let i = 0; i < directorIdArray.length; i++) {
      const apiResponse = await axios.get(
        `${apiUrl}person/${directorIdArray[i]}/movie_credits?api_key=${APIKEY}&language=en-US`
      );
      const array: Array<CrewCredit> = apiResponse.data.crew;
      const filteredArray = array.filter(
        (director) => director.job === "Director"
      );
      filteredArray.sort(function (a, b) {
        return b.popularity - a.popularity;
      });

      for (let i = 0; i < user.movielist.length; i++) {
        for (let j = 0; j < array.length; j++) {
          if (user.movielist[i].id === filteredArray[j].id) {
            filteredArray[j].inWatchlist = user.movielist[i].inWatchlist;
            filteredArray[j].seen = user.movielist[i].seen;
            filteredArray[j].user_rating = user.movielist[i]
              .user_rating as number;
          }
        }
      }

      finalResponse.push(filteredArray);
    }
    return finalResponse;
  } catch (e) {
    console.error(e, "onLoadArrayActorWithDB is failing");
  }
};

const onLoadArrayActorWithDB = async (
  array: Array<ActorRating>,
  user: UserMovieList
) => {
  try {
    let actorIdArray: Array<number> = [];
    const finalResponse: Array<NewActorList> = [];
    const max = array;
    if (max.length >= 2) {
      max.sort(function (a, b) {
        return b.count - a.count;
      });
      const newmax = max.slice(0, 3);
      const shuffledMax = shuffle(newmax);
      const highest = array;
      highest.sort(function (a, b) {
        return (
          (b.rating as number) / (b.count as number) -
          (a.rating as number) / (a.count as number)
        );
      });
      const newhighest = highest.slice(0, 3);
      const shuffled = shuffle(newhighest);
      let maxActor = shuffledMax[0].id;
      finalResponse.push({
        actorName: shuffledMax[0].name,
        movies: [],
      });

      let actorHighest = shuffled[0].id;
      if (actorHighest === maxActor) {
        actorHighest = shuffled[1].id;
        finalResponse.push({
          actorName:
            actorHighest === maxActor ? shuffled[1].name : shuffled[0].name,
          movies: [],
        });
      }
      actorIdArray = [maxActor, actorHighest];
    } else {
      const arr = [
        287, 1283, 71580, 1136406, 62, 6193, 3896, 31, 2888, 505710, 18918,
        10859, 1245, 139, 204, 1813, 83002, 18973,
      ];
      actorIdArray = [array[0].id];
      while (actorIdArray.length < 2) {
        let num = Math.floor(Math.random() * 18);
        const check = duplicateCheck(arr[num], actorIdArray);
        if (check) {
          actorIdArray.push(arr[num]);
          const actorName = actorsIDlist[arr[num]];
          finalResponse.push({
            actorName: actorName,
            movies: [],
          });
        }
      }
    }
    for (let i = 0; i < actorIdArray.length; i++) {
      const apiResponse = await axios.get(
        `${apiUrl}person/${actorIdArray[i]}/movie_credits?api_key=${APIKEY}&language=en-US`
      );
      const array: Array<CastCredit> = apiResponse.data.cast;
      array.sort(function (a, b) {
        return b.popularity - a.popularity;
      });
      checkIfInDB(user.movielist, array);
      finalResponse[i].movies = array;
    }
    return finalResponse;
  } catch (e) {
    console.error(e, "onLoadArrayActorWithDB is failing");
  }
};

/**
 *
 * @param {*} user user movie list
 * @param {*} max The highest rating they have put for a movie
 *
 * Looks through array of MovieGenreRating for genres that match max rating.
 *
 * @returns an array of ids of their favourite genres.
 */
const findFaveGenre = (user: UserMovieList, max: number) => {
  const genres = user.genres;
  const faves = [];
  for (let i = 0; i < genres.length; i++) {
    if (genres[i].rating === max) {
      faves.push(genres[i].id);
    }
  }
  return faves;
};

const findFaveDirector = (user: UserMovieList, max: number) => {
  const directors = user.directors;
  const faves = [];
  for (let i = 0; i < directors.length; i++) {
    if (directors[i].rating === max) {
      faves.push(directors[i].id);
    }
  }
  return faves;
};

const findFaveActor = (user: UserMovieList, max: number) => {
  const actors = user.actors;
  const faves = [];
  for (let i = 0; i < actors.length; i++) {
    if (actors[i].rating === max) {
      faves.push(actors[i].id);
    }
  }
  return faves;
};
/**
 *
 * @param {array} array the array to shuffle
 * @returns
 */
const shuffle = <T>(array: Array<T>) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

/**
 *
 * @param {*} userDB all user movies
 * @param {*} array movies from api /discover
 *
 * cross checks api movies against user movies and modifies movies in place
 * TODO change any declaration
 */
const checkIfInDB = (userDB: Array<MovieExtended>, array: any) => {
  for (let i = 0; i < userDB.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (userDB[i].id === array[j].id) {
        array[j].inWatchlist = userDB[i].inWatchlist;
        array[j].seen = userDB[i].seen;
        array[j].user_rating = userDB[i].user_rating;
      }
    }
  }
};

////////////////////////////////////////////////////////////////////

/**
 * Whatever loads when the page first does.
 * @param {*} req
 * @param {*} res
 */

/* 
  TODO Make a response type.
  [
    trending,

  ]
*/

const onLoad = async (req: Request, res: Response) => {
  try {
    // Find movie list for user.
    const userEmail = req.body.email;
    const user = await movielist.findOne({
      email: userEmail,
    });

    //
    // Gets a random page number to use in request. Different trending movies.
    const arr = onLoadArray();
    const finalResponse = [];
    for (let i = 0; i < arr.length; i++) {
      const apiResponse = await axios.get(
        `${apiUrl}trending/movie/day?api_key=${APIKEY}&page=${arr[i]}`
      );
      const shuffled = shuffle(apiResponse.data.results);
      // update with user data.
      checkIfInDB(user.movielist, shuffled);
      // finalResponse.push(...shuffled);
    }

    const genre: Array<GenreRating> | undefined =
      (await genreSort(userEmail)) || undefined;
    // const genre = undefined;
    let genreIDArr;
    if (genre === undefined) {
      genreIDArr = await onLoadArrayGenreNoDB();
    }
    if (genre) {
      genreIDArr = await onLoadArrayGenreWithDB(genre, user);
    }
    finalResponse.push(genreIDArr);

    const director: Array<DirectorRating> | undefined = await directorSort(
      userEmail
    );
    let directorIDArr;
    if (director === undefined) {
      directorIDArr = await onLoadDirectorNoDB();
    }
    if (director) {
      directorIDArr = await onLoadArrayDirectorWithDB(director, user);
    }
    // finalResponse.push(directorIDArr);

    const actor = await actorSort(userEmail);
    let actorIDArr;
    if (actor === undefined) {
      actorIDArr = await onLoadActorNoDB();
    }
    if (actor) {
      actorIDArr = await onLoadArrayActorWithDB(actor, user);
    }
    // finalResponse.push(actorIDArr);
    // finalResponse.push(user)
    res.status(200);
    res.send(finalResponse);
  } catch (e) {
    console.error(e, "onLoad is failing");
    res.status(500);
  }
};
/**
 *
 * Find a user's movie list, and separates out into
 * watchlist: What they want to watch
 * watchedMovies: what they've watched
 *
 *
 */
const onLoadWatchlist = async (req: Request, res: Response) => {
  try {
    const userEmail = req.body.email;
    const user = await movielist.findOne({ email: userEmail });
    const userMovies: Array<MovieExtended> = user.movielist;
    const watchlistMovies = userMovies.filter((movie) => movie.seen === false);
    const watchedMovies = userMovies.filter((movie) => movie.seen === true);
    const finalResponse = [];
    if (watchlistMovies.length > 0) {
      finalResponse.push(watchlistMovies);
    }

    /* 
      TODO factor out into separate helpers.
      Finds the user's highest rating on any film
    */
    if (watchedMovies.length > 0) {
      let max = 0;
      for (let i = 0; i < watchedMovies.length; i++) {
        if ((watchedMovies[i].user_rating as number) >= max) {
          max = watchedMovies[i].user_rating as number;
        }
      }

      /* 
        Get a random bunch of movies of those genres,
        the first page
        sorted by popularity descending

        same for directors and actors

        Top three genres, directors and actors


        TODO figure out api response types for these.
        TODO comma sep, separate at front

      */
      const genres = findFaveGenre(user, max);
      const shuffleGenres = shuffle(genres);
      const faveGenres = shuffleGenres.slice(0, 2);
      for (let i = 0; i < faveGenres.length; i++) {
        const apiResponse = await axios.get(
          `${apiUrl}discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${faveGenres[i]}`
        );
        finalResponse.push(apiResponse.data.results);
      }
      const directors = findFaveDirector(user, max);
      const shuffleDirectors = shuffle(directors);
      const faveDirectors = shuffleDirectors.slice(0, 2);
      for (let i = 0; i < faveDirectors.length; i++) {
        /**
         * Movies they have been in, sort by popularity.
         */
        const apiResponse = await axios.get(
          `${apiUrl}person/${faveDirectors[i]}/movie_credits?api_key=${APIKEY}&language=en-US`
        );
        const array: Array<CastCredit> = apiResponse.data.cast;
        array.sort(function (a, b) {
          return b.popularity - a.popularity;
        });
        finalResponse.push(array);
      }
      const actors = findFaveActor(user, max);
      const shuffleActors = shuffle(actors);
      const faveActors = shuffleActors.slice(0, 2);
      for (let i = 0; i < faveActors.length; i++) {
        const apiResponse = await axios.get(
          `${apiUrl}person/${faveActors[i]}/movie_credits?api_key=${APIKEY}&language=en-US`
        );
        const array: Array<CastCredit> = apiResponse.data.cast;
        array.sort(function (a, b) {
          return b.popularity - a.popularity;
        });
        finalResponse.push(array);
      }
    }
    if (watchedMovies.length === 0) {
      const arr = onLoadArray();
      for (let i = 0; i < arr.length; i++) {
        const apiResponse = await axios.get(
          `${apiUrl}trending/movie/day?api_key=${APIKEY}&page=${arr[i]}`
        );
        const shuffled = shuffle(apiResponse.data.results);
        finalResponse.push(...shuffled);
      }
    }

    checkIfInDB(userMovies, finalResponse);
    res.status(200);
    res.send(finalResponse);
  } catch (e) {
    console.error(e, "onLoadWatchlist is failing");
    res.status(500);
  }
};

const onLoadWatched = async (req: Request, res: Response) => {
  try {
    const userEmail = req.body.email;
    const user = await movielist.findOne({ email: userEmail });
    const userMovies: Array<MovieExtended> = user.movielist;
    const watchedMovies = userMovies.filter((movie) => movie.seen === true);
    const finalResponse = [];

    if (watchedMovies.length > 0) {
      finalResponse.push(watchedMovies);
      let max = 0;
      for (let i = 0; i < watchedMovies.length; i++) {
        if ((watchedMovies[i].user_rating as number) >= max) {
          max = watchedMovies[i].user_rating as number;
        }
      }
      const genres = findFaveGenre(user, max);
      const shuffleGenres = shuffle(genres);
      const faveGenres = shuffleGenres.slice(0, 2);
      for (let i = 0; i < faveGenres.length; i++) {
        const apiResponse = await axios.get(
          `${apiUrl}discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${faveGenres[i]}`
        );
        finalResponse.push(apiResponse.data.results);
      }
      const directors = findFaveDirector(user, max);
      const shuffleDirectors = shuffle(directors);
      const faveDirectors = shuffleDirectors.slice(0, 2);
      for (let i = 0; i < faveDirectors.length; i++) {
        const apiResponse = await axios.get(
          `${apiUrl}person/${faveDirectors[i]}/movie_credits?api_key=${APIKEY}&language=en-US`
        );
        const array: Array<CastCredit> = apiResponse.data.cast;
        array.sort(function (a, b) {
          return b.popularity - a.popularity;
        });
        finalResponse.push(array);
      }
      const actors = findFaveActor(user, max);
      const shuffleActors = shuffle(actors);
      const faveActors = shuffleActors.slice(0, 2);
      for (let i = 0; i < faveActors.length; i++) {
        const apiResponse = await axios.get(
          `${apiUrl}person/${faveActors[i]}/movie_credits?api_key=${APIKEY}&language=en-US`
        );
        const array = apiResponse.data.cast;
        array.sort(function (a: CastCredit, b: CastCredit) {
          return b.popularity - a.popularity;
        });
        finalResponse.push(array);
      }
    }
    checkIfInDB(userMovies, finalResponse);
    res.status(200);
    res.send(finalResponse);
  } catch (e) {
    console.error(e, "onLoadWatchlist is failing");
    res.status(500);
  }
};

/**
 * Adds to watchlist, updates db.
 *
 *
 */
const addWatchlist = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const filter = { email: req.body.sessionid };
    const movie: MovieExtended = (await getMovieWithCredits(
      id
    )) as MovieExtended;
    movie.inWatchlist = true;
    movie.seen = false;
    movie.user_rating = null;
    const genres = movie.genres;
    for (let i = 0; i < genres.length; i++) {
      genres[i].rating = null;
      genres[i].movid = id;
    }
    const crew: Array<CrewCredit> = movie.credits.crew;
    const director = await directorCheck(crew, id, null);
    const cast = movie.credits.cast;
    const actor = await actorCheck(cast, id, null);
    let update = await movielist.findOneAndUpdate(filter, {
      $push: {
        movielist: [movie],
        genres: genres,
        directors: director,
        actors: actor,
      },
    });
    update = await movielist.findOne(filter);
    res.status(200);
    res.send(update);
  } catch (e) {
    console.error(e, "addWatchlist is failing");
    res.status(500);
  }
};

const addWatched = async (req: Request, res: Response) => {
  try {
    const movieid = req.body.id;
    const userRating = req.body.user_rating;
    const userEmail = req.body.sessionid;
    const userList = await movielist.findOne({ email: userEmail });
    let inDB = false;
    for (let i = 0; i < userList.movielist.length; i++) {
      if (userList.movielist[i].id === movieid) {
        inDB = true;
      }
    }
    if (inDB === true) {
      const filter = await movielist.updateOne(
        {
          email: userEmail,
        },
        { $pull: { movielist: { id: movieid } } }
      );
      const genreFilter = await movielist.updateMany(
        {
          email: userEmail,
        },
        { $pull: { genres: { movid: movieid } } }
      );
      const actorFilter = await movielist.updateMany(
        {
          email: userEmail,
        },
        { $pull: { actors: { movid: movieid } } }
      );
      const directorFilter = await movielist.updateMany(
        {
          email: userEmail,
        },
        { $pull: { directors: { movid: movieid } } }
      );
    }
    const movie: MovieExtended = (await getMovieWithCredits(
      movieid
    )) as MovieExtended;
    movie.inWatchlist = false;
    movie.seen = true;
    movie.user_rating = userRating;
    const genres = movie.genres;
    for (let i = 0; i < genres.length; i++) {
      genres[i].rating = userRating;
      genres[i].movid = movieid;
    }
    const crew = movie.credits.crew;
    const director = await directorCheck(crew, movieid, userRating);
    const cast = movie.credits.cast;
    const actor = await actorCheck(cast, movieid, userRating);
    let update = await movielist.findOneAndUpdate(
      { email: userEmail },
      {
        $push: {
          movielist: [movie],
          genres: genres,
          directors: director,
          actors: actor,
        },
      }
    );
    update = await movielist.findOne({ email: userEmail });
    res.status(200);
    res.send(update);
  } catch (e) {
    console.error(e, "addWatched is failing");
    res.status(500);
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  try {
    const useremail = req.body.sessionid;
    const movieid = req.body.id;
    const filter = await movielist.updateOne(
      {
        email: useremail,
      },
      { $pull: { movielist: { id: movieid } } }
    );
    const genreFilter = await movielist.updateMany(
      {
        email: useremail,
      },
      { $pull: { genres: { movid: movieid } } }
    );
    const actorFilter = await movielist.updateMany(
      {
        email: useremail,
      },
      { $pull: { actors: { movid: movieid } } }
    );
    const directorFilter = await movielist.updateMany(
      {
        email: useremail,
      },
      { $pull: { directors: { movid: movieid } } }
    );
    res.status(200);
    res.send(filter);
  } catch (e) {
    console.error(e, "deleteMovie is failing");
    res.status(500);
  }
};

module.exports = {
  onLoad,
  addWatchlist,
  addWatched,
  deleteMovie,
  onLoadWatchlist,
  onLoadWatched,
};
