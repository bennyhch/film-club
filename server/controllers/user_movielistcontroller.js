"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.addWatched = exports.addWatchlist = exports.onLoadWatched = exports.onLoadWatchlist = exports.onLoad = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const user = require("../models/user");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const movielist = require("../models/user_movielist");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require("axios");
const apiUrl = "https://api.themoviedb.org/3/";
const APIKEY = process.env.API_KEY;
/*
  TODO Refactor this into one function.
  e.g. random number 1-10
*/
// To replace numGenTo10 etc
function numGen(num) {
    return Math.floor(Math.random() * (num + 1));
}
/*
  TODO Refactor, in built method.
*/
const duplicateCheck = (num, array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === num)
            return false;
    }
    return true;
};
/**
 *
 * @returns an array of 1,2,3[3 random numbers between 1-10][]
 */
// const onLoadArray = () => {
//   const arr = [1, 2, 3];
//   while (arr.length < 6) {
//     let num = numGenTo10();
//     const check = duplicateCheck(num, arr);
//     if (check && num !== 0) {
//       arr.push(num);
//     }
//   }
//   while (arr.length < 8) {
//     let num = numGenTo100();
//     const check = duplicateCheck(num, arr);
//     if (check && num !== 0) {
//       arr.push(num);
//     }
//   }
//   while (arr.length < 10) {
//     let num = numGenTo1000();
//     const check = duplicateCheck(num, arr);
//     if (check && num !== 0) {
//       arr.push(num);
//     }
//   }
//   return arr;
// };
// onLoadArray: create an array with nine elements, without any duplications,
// [1,2,3, (3 random num from 4-10), (... from 11-100), (... from 101-1000)]
const onLoadArray = () => {
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const arr = [1, 2, 3];
    while (arr.length < 6) {
        const newNum = random(4, 11);
        if (duplicateCheck(newNum, arr))
            arr.push(newNum);
    }
    while (arr.length < 8) {
        const newNum = random(11, 101);
        if (duplicateCheck(newNum, arr))
            arr.push(newNum);
    }
    while (arr.length < 10) {
        const newNum = random(101, 1001);
        if (duplicateCheck(newNum, arr))
            arr.push(newNum);
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
const directorCheck = (arr, movieid, userRating) => __awaiter(void 0, void 0, void 0, function* () {
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
                id: directorID,
                name: directorName,
                rating: userRating,
            },
        ];
    }
    catch (e) {
        console.error(e, "directorCheck is failing");
        return undefined;
    }
});
const actorCheck = (arr, movieid, userRating) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (e) {
        console.error(e, "actorCheck is failing");
    }
});
const getMovieWithCredits = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield axios.get(`${apiUrl}movie/${id}?api_key=${APIKEY}&append_to_response=credits`);
        return movie.data;
    }
    catch (e) {
        console.error(e, "getMovieWithCredits is failing");
    }
    return undefined;
});
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
const genreSort = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = yield movielist.findOne({
            email: userEmail,
        });
        const genresNull = filter.genres;
        // Get only the genres that have a rating.
        const genres = genresNull.filter((genre) => genre.rating);
        if (genres.length === 0)
            return undefined;
        // Set genreArray to first user genre.
        const genreArray = [
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
            const len = genreArray.length;
            for (let j = 0; j < len; j++) {
                if (genres[i].name === genreArray[j].name) {
                    genreArray[j].rating = genreArray[j].rating + genres[i].rating;
                    const count = genreArray[j].count;
                    genreArray[j].count = count + 1;
                    // If it has got to the end of the array. Return it.
                    if (i < genres.length - 1) {
                        continue;
                    }
                    else {
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
    }
    catch (e) {
        console.error(e, "genreSort is failing");
    }
});
/**
 *
 * @param {*} userEmail
 * @returns Similar to above, collates ratings.
 */
const directorSort = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = yield movielist.findOne({
            email: userEmail,
        });
        const directorsNull = filter.directors;
        const directors = directorsNull.filter((director) => director.rating);
        if (directors.length === 0)
            return undefined;
        const directorArray = [
            {
                name: directors[0].name,
                id: directors[0].id,
                rating: directors[0].rating,
                count: 1,
            },
        ];
        for (let i = 1; i < directors.length; i++) {
            const len = directorArray.length;
            for (let j = 0; j < len; j++) {
                if (directors[i].name === directorArray[j].name) {
                    directorArray[j].rating =
                        directorArray[j].rating + directors[i].rating;
                    directorArray[j].count = directorArray[j].count + 1;
                    if (i < directors.length - 1) {
                        continue;
                    }
                    else {
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
    }
    catch (e) {
        console.error(e, "directorSort is failing");
    }
});
const actorSort = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = yield movielist.findOne({
            email: userEmail,
        });
        const actorsNull = filter.actors;
        const actors = actorsNull.filter((actor) => actor.rating);
        if (actors.length === 0)
            return undefined;
        const actorArray = [
            {
                name: actors[0].name,
                id: actors[0].id,
                rating: actors[0].rating,
                count: 1,
            },
        ];
        for (let i = 1; i < actors.length; i++) {
            const len = actorArray.length;
            for (let j = 0; j < len; j++) {
                if (actors[i].name === actorArray[j].name) {
                    actorArray[j].rating =
                        actorArray[j].rating + actors[i].rating;
                    actorArray[j].count++;
                    if (i < actors.length - 1) {
                        continue;
                    }
                    else {
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
    }
    catch (e) {
        console.error(e, "actorSort is failing");
    }
});
/*
  This section is for prepopulating the main page, if the user has not put anything in, to have a default.


*/
const genreIDlist = [
    28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
    53, 10752, 37,
];
const genreIDlookup = {
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
const directorsIDlist = {
    55934: "Taika Waititi",
    488: "Steven Spielberg",
    1032: "Martin Scorsese",
    138: "Quentin Tarantino",
    578: "Ridley Scott",
    1223: "The Coen Brothers",
    525: "Christopher Nolan",
    108: "Peter Jackson",
};
const actorsIDlist = {
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
const onLoadArrayGenreNoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arr = [];
        const finalResponse = [];
        // arr to contain 3 elements with random different numbers ranging from 0-18 inclusively
        while (arr.length < 3) {
            const num = numGen(18);
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
            const apiResponse = yield axios.get(`${apiUrl}discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreIDArr[i]}`);
            finalResponse[i].movies = apiResponse.data.results;
        }
        return finalResponse;
    }
    catch (e) {
        console.error(e, "onLoadArrayGenreNoDB is failing");
    }
});
const onLoadDirectorNoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arr = [55934, 488, 1032, 138, 578, 1223, 525, 108];
        const finalArr = [];
        const finalResponse = [];
        while (finalArr.length < 2) {
            const num = Math.floor(Math.random() * 8);
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
            const apiResponse = yield axios.get(`${apiUrl}person/${finalArr[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
            const array = apiResponse.data.crew;
            const filteredArray = array.filter((director) => director.job === "Director");
            filteredArray.sort(function (a, b) {
                return b.popularity - a.popularity;
            });
            finalResponse[i].movies = filteredArray;
        }
        return finalResponse;
    }
    catch (e) {
        console.error(e, "onLoadDirectorNoDB is failing");
    }
    return undefined;
});
const onLoadActorNoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arr = [
            287, 1283, 71580, 1136406, 62, 6193, 3896, 31, 2888, 505710, 18918, 10859,
            1245, 139, 204, 1813, 83002, 18973,
        ];
        // finalArr is array of randoms
        const finalArr = [];
        const finalResponse = [];
        while (finalArr.length < 2) {
            const num = Math.floor(Math.random() * 18);
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
            const apiResponse = yield axios.get(`${apiUrl}person/${finalArr[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
            const array = apiResponse.data.cast;
            array.sort(function (a, b) {
                return b.popularity - a.popularity;
            });
            finalResponse[i].movies = array;
        }
        return finalResponse;
    }
    catch (e) {
        console.error(e, "onLoadDirectorNoDB is failing");
    }
});
// (async () => {
//   let resp = await onLoadArrayGenreNoDB();
// })();
/*
interface GenreRating {
  movid?: number;
  name: string;
  id: number;
  rating: number | null;
  count: number;
}

  1. sort by count.
  2. get top 2
  3. shuffle
*/
const onLoadArrayGenreWithDB = (array, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = 1;
        const max = array;
        max.sort(function (a, b) {
            return b.count - a.count;
        });
        const newmax = max.slice(0, 3);
        const shuffledMax = shuffle(newmax);
        const highest = array;
        /*Sorting by the ratio of rating to count */
        highest.sort(function (a, b) {
            return (b.rating / b.count -
                a.rating / a.count);
        });
        const genreArray = [];
        const newhighest = highest.slice(0, 3);
        const shuffled = shuffle(newhighest);
        const maxGenre = shuffledMax[0].id;
        const finalResponse = [];
        if (highest.length === 1) {
            genreArray.push(shuffled[0].id);
        }
        else if (highest.length > 1) {
            // Get at least two genreIDs
            let maxHighest = shuffled[0].id;
            if (maxHighest === maxGenre)
                maxHighest = shuffled[1].id;
            genreArray.push(maxGenre, maxHighest);
        }
        while (genreArray.length < 3) {
            // const num = numGenTo18();
            const num = numGen(18);
            const randomGenre = genreIDlist[num];
            const check = duplicateCheck(randomGenre, genreArray);
            if (check) {
                genreArray.push(randomGenre);
            }
        }
        for (let i = 0; i < genreArray.length; i++) {
            const genreName = genreIDlookup[genreArray[i]];
            finalResponse.push({
                genreName: genreName,
                movies: [],
            });
        }
        for (let i = 0; i < genreArray.length; i++) {
            const apiResponse = yield axios.get(`${apiUrl}discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreArray[i]}`);
            const response = apiResponse.data.results;
            checkIfInDB(user.movielist, response);
            finalResponse[i].movies = response;
        }
        return finalResponse;
    }
    catch (e) {
        console.error(e, "onLoadArrayGenreWithDB is failing");
    }
});
const onLoadArrayDirectorWithDB = (array, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let directorIdArray = [];
        const finalResponse = [];
        const max = array;
        if (max.length >= 2) {
            max.sort(function (a, b) {
                return b.count - a.count;
            });
            const newmax = max.slice(0, 3);
            const shuffledMax = shuffle(newmax);
            const highest = array;
            highest.sort(function (a, b) {
                return (b.rating / b.count -
                    a.rating / a.count);
            });
            const newhighest = highest.slice(0, 3);
            const shuffled = shuffle(newhighest);
            const maxDirector = shuffledMax[0].id;
            finalResponse.push({
                directorName: shuffledMax[0].name,
                movies: [],
            });
            let directorHighest = shuffled[0].id;
            directorHighest = shuffled[1].id;
            finalResponse.push({
                directorName: maxDirector === directorHighest ? shuffled[1].name : shuffled[0].name,
                movies: [],
            });
            directorIdArray = [maxDirector, directorHighest];
        }
        else {
            const arr = [55934, 488, 1032, 138, 578, 1223, 525, 108];
            const directorIdArray = [array[0].id];
            while (directorIdArray.length < 2) {
                const num = Math.floor(Math.random() * 8);
                const check = duplicateCheck(arr[num], directorIdArray);
                if (check) {
                    directorIdArray.push(arr[num]);
                    const directorName = directorsIDlist[arr[num]];
                    finalResponse.push({
                        directorName: directorName,
                        movies: [],
                    });
                }
            }
        }
        ////
        for (let i = 0; i < directorIdArray.length; i++) {
            const apiResponse = yield axios.get(`${apiUrl}person/${directorIdArray[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
            const array = apiResponse.data.crew;
            const filteredArray = array.filter((director) => director.job === "Director");
            filteredArray.sort(function (a, b) {
                return b.popularity - a.popularity;
            });
            for (let i = 0; i < user.movielist.length; i++) {
                for (let j = 0; j < filteredArray.length; j++) {
                    if (user.movielist[i].id === filteredArray[j].id) {
                        filteredArray[j].inWatchlist = user.movielist[i].inWatchlist;
                        filteredArray[j].seen = user.movielist[i].seen;
                        filteredArray[j].user_rating = user.movielist[i]
                            .user_rating;
                    }
                }
            }
            finalResponse[i].movies = filteredArray;
        }
        return finalResponse;
    }
    catch (e) {
        console.error(e, "onLoadArrayActorWithDB is failing");
    }
});
const onLoadArrayActorWithDB = (array, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let actorIdArray = [];
        const finalResponse = [];
        const max = array;
        if (max.length >= 2) {
            max.sort(function (a, b) {
                return b.count - a.count;
            });
            const newmax = max.slice(0, 3);
            const shuffledMax = shuffle(newmax);
            const highest = array;
            highest.sort(function (a, b) {
                return (b.rating / b.count -
                    a.rating / a.count);
            });
            const newhighest = highest.slice(0, 3);
            const shuffled = shuffle(newhighest);
            const maxActor = shuffledMax[0].id;
            finalResponse.push({
                actorName: shuffledMax[0].name,
                movies: [],
            });
            let actorHighest = shuffled[0].id;
            if (shuffled.length === 1) {
                actorIdArray.push(actorHighest);
            }
            else if (shuffled.length > 1) {
                if (actorHighest === maxActor) {
                    actorHighest = shuffled[1].id;
                    finalResponse.push({
                        actorName: actorHighest === maxActor ? shuffled[1].name : shuffled[0].name,
                        movies: [],
                    });
                }
                actorIdArray.push(maxActor, actorHighest);
            }
        }
        else {
            const arr = [
                287, 1283, 71580, 1136406, 62, 6193, 3896, 31, 2888, 505710, 18918,
                10859, 1245, 139, 204, 1813, 83002, 18973,
            ];
            actorIdArray = [array[0].id];
            while (actorIdArray.length < 2) {
                const num = Math.floor(Math.random() * 18);
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
        for (let i = 0; i < finalResponse.length; i++) {
            const apiResponse = yield axios.get(`${apiUrl}person/${actorIdArray[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
            const array = apiResponse.data.cast;
            array.sort(function (a, b) {
                return b.popularity - a.popularity;
            });
            checkIfInDB(user.movielist, array);
            finalResponse[i].movies = array;
        }
        return finalResponse;
    }
    catch (e) {
        console.error(e, "onLoadArrayActorWithDB is failing");
    }
});
/**
 *
 * @param {*} user user movie list
 * @param {*} max The highest rating they have put for a movie
 *
 * Looks through array of MovieGenreRating for genres that match max rating.
 *
 * @returns an array of ids of their favourite genres.
 */
const findFaveGenre = (user, max) => {
    const genres = user.genres;
    const faves = [];
    for (let i = 0; i < genres.length; i++) {
        if (genres[i].rating === max) {
            faves.push(genres[i].id);
        }
    }
    return faves;
};
const findFaveDirector = (user, max) => {
    const directors = user.directors;
    const faves = [];
    for (let i = 0; i < directors.length; i++) {
        if (directors[i].rating === max) {
            faves.push(directors[i].id);
        }
    }
    return faves;
};
const findFaveActor = (user, max) => {
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
const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
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
const checkIfInDB = (userDB, array) => {
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
const onLoad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find movie list for user.
        const userEmail = req.body.email;
        const user = yield movielist.findOne({
            email: userEmail,
        });
        // TRENDING
        // Gets a random page number to use in request. Different trending movies.
        const arr = onLoadArray();
        const finalResponse = [];
        for (let i = 0; i < arr.length; i++) {
            const apiResponse = yield axios.get(`${apiUrl}trending/movie/day?api_key=${APIKEY}&page=${arr[i]}`);
            const shuffled = shuffle(apiResponse.data.results);
            // update with user data.
            checkIfInDB(user.movielist, shuffled);
            finalResponse.push(...shuffled);
        }
        // GENRES
        // this FLATTENS the GenreRatings into a set so that count can be reduced.
        const genre = (yield genreSort(userEmail)) || undefined;
        // const genre = undefined;
        let genreIDArr;
        if (genre === undefined) {
            genreIDArr = yield onLoadArrayGenreNoDB();
        }
        if (genre) {
            genreIDArr = yield onLoadArrayGenreWithDB(genre, user);
        }
        finalResponse.push(genreIDArr);
        // DIRECTORS
        const director = yield directorSort(userEmail);
        let directorIDArr;
        if (director === undefined) {
            directorIDArr = yield onLoadDirectorNoDB();
        }
        if (director) {
            directorIDArr = yield onLoadArrayDirectorWithDB(director, user);
        }
        finalResponse.push(directorIDArr);
        // Actors
        const actor = yield actorSort(userEmail);
        let actorIDArr;
        if (actor === undefined) {
            actorIDArr = yield onLoadActorNoDB();
        }
        if (actor) {
            actorIDArr = yield onLoadArrayActorWithDB(actor, user);
        }
        finalResponse.push(actorIDArr);
        finalResponse.push(user);
        res.status(200);
        res.send(finalResponse);
    }
    catch (e) {
        console.error(e, "onLoad is failing");
        res.status(500);
    }
});
exports.onLoad = onLoad;
/**
 *
 * Find a user's movie list, and separates out into
 * watchlist: What they want to watch
 * watchedMovies: what they've watched
 *
 *
 */
const onLoadWatchlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.body.email;
        const user = yield movielist.findOne({ email: userEmail });
        const a = req.params;
        const b = a.id;
        const userMovies = user.movielist;
        const watchlistMovies = userMovies.filter((movie) => movie.seen === false);
        const watchedMovies = userMovies.filter((movie) => movie.seen === true);
        const finalResponse = {};
        finalResponse.watchlistMovieLists = [];
        finalResponse.genreMovieLists = [];
        finalResponse.actorMovieLists = [];
        finalResponse.directorMovieLists = [];
        if (watchlistMovies.length > 0) {
            finalResponse.watchlistMovieLists.push(watchlistMovies);
        }
        /*
          TODO factor out into separate helpers.
          Finds the user's highest rating on any film they've watched
        */
        if (watchedMovies.length > 0) {
            let max = 0;
            for (let i = 0; i < watchedMovies.length; i++) {
                if (watchedMovies[i].user_rating >= max) {
                    max = watchedMovies[i].user_rating;
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
            /*
              Returns genre ids for fave genres.
            */
            const genres = findFaveGenre(user, max);
            const shuffleGenres = shuffle(genres);
            const faveGenres = shuffleGenres.slice(0, 2);
            for (let i = 0; i < faveGenres.length; i++) {
                const apiResponse = yield axios.get(`${apiUrl}discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${faveGenres[i]}`);
                finalResponse.genreMovieLists.push(apiResponse.data.results);
            }
            /////////////////////////////////////////////
            const directors = findFaveDirector(user, max);
            const shuffleDirectors = shuffle(directors);
            const faveDirectors = shuffleDirectors.slice(0, 2);
            for (let i = 0; i < faveDirectors.length; i++) {
                /**
                 * Movies they have been in, sort by popularity.
                 */
                const apiResponse = yield axios.get(`${apiUrl}person/${faveDirectors[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
                let array = apiResponse.data.crew;
                array = array.filter((film) => film.job === "Director");
                console.log(array);
                array.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                finalResponse.directorMovieLists.push(array);
            }
            /////////////////////////////////////////
            const actors = findFaveActor(user, max);
            const shuffleActors = shuffle(actors);
            const faveActors = shuffleActors.slice(0, 2);
            for (let i = 0; i < faveActors.length; i++) {
                const apiResponse = yield axios.get(`${apiUrl}person/${faveActors[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
                const array = apiResponse.data.cast;
                array.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                finalResponse.actorMovieLists.push(array);
            }
        }
        if (watchedMovies.length === 0) {
            const arr = onLoadArray();
            for (let i = 0; i < arr.length; i++) {
                const apiResponse = yield axios.get(`${apiUrl}trending/movie/day?api_key=${APIKEY}&page=${arr[i]}`);
                const shuffled = shuffle(apiResponse.data.results);
                finalResponse.watchlistMovieLists.push(shuffled);
            }
        }
        checkIfInDB(userMovies, finalResponse);
        res.status(200).send(JSON.stringify(finalResponse));
    }
    catch (e) {
        console.error(e, "onLoadWatchlist is failing");
        res.status(500);
    }
});
exports.onLoadWatchlist = onLoadWatchlist;
const onLoadWatched = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.body.email;
        const user = yield movielist.findOne({ email: userEmail });
        const userMovies = user.movielist;
        const watchedMovies = userMovies.filter((movie) => movie.seen === true);
        const finalResponse = [];
        if (watchedMovies.length > 0) {
            finalResponse.push(watchedMovies);
            let max = 0;
            for (let i = 0; i < watchedMovies.length; i++) {
                if (watchedMovies[i].user_rating >= max) {
                    max = watchedMovies[i].user_rating;
                }
            }
            const genres = findFaveGenre(user, max);
            const shuffleGenres = shuffle(genres);
            const faveGenres = shuffleGenres.slice(0, 2);
            for (let i = 0; i < faveGenres.length; i++) {
                const apiResponse = yield axios.get(`${apiUrl}discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${faveGenres[i]}`);
                finalResponse.push(apiResponse.data.results);
            }
            const directors = findFaveDirector(user, max);
            const shuffleDirectors = shuffle(directors);
            const faveDirectors = shuffleDirectors.slice(0, 2);
            for (let i = 0; i < faveDirectors.length; i++) {
                const apiResponse = yield axios.get(`${apiUrl}person/${faveDirectors[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
                const array = apiResponse.data.cast;
                array.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                finalResponse.push(array);
            }
            const actors = findFaveActor(user, max);
            const shuffleActors = shuffle(actors);
            const faveActors = shuffleActors.slice(0, 2);
            for (let i = 0; i < faveActors.length; i++) {
                const apiResponse = yield axios.get(`${apiUrl}person/${faveActors[i]}/movie_credits?api_key=${APIKEY}&language=en-US`);
                const array = apiResponse.data.cast;
                array.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                finalResponse.push(array);
            }
        }
        checkIfInDB(userMovies, finalResponse);
        res.status(200);
        res.send(finalResponse);
    }
    catch (e) {
        console.error(e, "onLoadWatchlist is failing");
        res.status(500);
    }
});
exports.onLoadWatched = onLoadWatched;
/**
 * Adds to watchlist, updates db.
 *
 *
 */
const addWatchlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const filter = { email: req.body.sessionid };
        const movie = (yield getMovieWithCredits(id));
        movie.inWatchlist = true;
        movie.seen = false;
        movie.user_rating = null;
        const genres = movie.genres;
        for (let i = 0; i < genres.length; i++) {
            genres[i].rating = null;
            genres[i].movid = id;
        }
        const crew = movie.credits.crew;
        const director = yield directorCheck(crew, id, null);
        const cast = movie.credits.cast;
        const actor = yield actorCheck(cast, id, null);
        let update = yield movielist.findOneAndUpdate(filter, {
            $push: {
                movielist: [movie],
                genres: genres,
                directors: director,
                actors: actor,
            },
        });
        update = yield movielist.findOne(filter);
        res.status(200);
        res.send(update);
    }
    catch (e) {
        console.error(e, "addWatchlist is failing");
        res.status(500);
    }
});
exports.addWatchlist = addWatchlist;
const addWatched = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieid = req.body.id;
        const userRating = req.body.user_rating;
        const userEmail = req.body.sessionid;
        const userList = yield movielist.findOne({ email: userEmail });
        let inDB = false;
        for (let i = 0; i < userList.movielist.length; i++) {
            if (userList.movielist[i].id === movieid) {
                inDB = true;
            }
        }
        if (inDB === true) {
            const filter = yield movielist.updateOne({
                email: userEmail,
            }, { $pull: { movielist: { id: movieid } } });
            const genreFilter = yield movielist.updateMany({
                email: userEmail,
            }, { $pull: { genres: { movid: movieid } } });
            const actorFilter = yield movielist.updateMany({
                email: userEmail,
            }, { $pull: { actors: { movid: movieid } } });
            const directorFilter = yield movielist.updateMany({
                email: userEmail,
            }, { $pull: { directors: { movid: movieid } } });
        }
        const movie = (yield getMovieWithCredits(movieid));
        movie.inWatchlist = false;
        movie.seen = true;
        movie.user_rating = userRating;
        const genres = movie.genres;
        for (let i = 0; i < genres.length; i++) {
            genres[i].rating = userRating;
            genres[i].movid = movieid;
        }
        const crew = movie.credits.crew;
        const director = yield directorCheck(crew, movieid, userRating);
        const cast = movie.credits.cast;
        const actor = yield actorCheck(cast, movieid, userRating);
        let update = yield movielist.findOneAndUpdate({ email: userEmail }, {
            $push: {
                movielist: [movie],
                genres: genres,
                directors: director,
                actors: actor,
            },
        });
        update = yield movielist.findOne({ email: userEmail });
        res.status(200);
        res.send(update);
    }
    catch (e) {
        console.error(e, "addWatched is failing");
        res.status(500);
    }
});
exports.addWatched = addWatched;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const useremail = req.body.sessionid;
        const movieid = req.body.id;
        const filter = yield movielist.updateOne({
            email: useremail,
        }, { $pull: { movielist: { id: movieid } } });
        const genreFilter = yield movielist.updateMany({
            email: useremail,
        }, { $pull: { genres: { movid: movieid } } });
        const actorFilter = yield movielist.updateMany({
            email: useremail,
        }, { $pull: { actors: { movid: movieid } } });
        const directorFilter = yield movielist.updateMany({
            email: useremail,
        }, { $pull: { directors: { movid: movieid } } });
        res.status(200);
        res.send(filter);
    }
    catch (e) {
        console.error(e, "deleteMovie is failing");
        res.status(500);
    }
});
exports.deleteMovie = deleteMovie;
module.exports = {
    onLoad: exports.onLoad,
    addWatchlist: exports.addWatchlist,
    addWatched: exports.addWatched,
    deleteMovie: exports.deleteMovie,
    onLoadWatchlist: exports.onLoadWatchlist,
    onLoadWatched: exports.onLoadWatched,
};
