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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("dotenv").config();
var user = require("../models/user");
var movielist = require("../models/user_movielist");
var axios = require("axios");
var apiUrl = "https://api.themoviedb.org/3/";
var APIKEY = process.env.API_KEY;
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
var duplicateCheck = function (num, array) {
    for (var i = 0; i < array.length; i++) {
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
var onLoadArray = function () {
    var random = function (min, max) { return Math.floor(Math.random() * (max - min)) + min; };
    var arr = [1, 2, 3];
    while (arr.length < 6) {
        var newNum = random(4, 11);
        if (duplicateCheck(newNum, arr))
            arr.push(newNum);
    }
    while (arr.length < 8) {
        var newNum = random(11, 101);
        if (duplicateCheck(newNum, arr))
            arr.push(newNum);
    }
    while (arr.length < 10) {
        var newNum = random(101, 1001);
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
var directorCheck = function (arr, movieid, userRating) { return __awaiter(void 0, void 0, void 0, function () {
    var directorName, directorID, i;
    return __generator(this, function (_a) {
        try {
            directorName = "";
            directorID = void 0;
            for (i = 0; i < arr.length; i++) {
                if (arr[i].job === "Director") {
                    directorName = arr[i].name;
                    directorID = arr[i].id;
                }
            }
            return [2 /*return*/, [
                    {
                        movid: movieid,
                        id: directorID,
                        name: directorName,
                        rating: userRating
                    },
                ]];
        }
        catch (e) {
            console.error(e, "directorCheck is failing");
            return [2 /*return*/, undefined];
        }
        return [2 /*return*/];
    });
}); };
var actorCheck = function (arr, movieid, userRating) { return __awaiter(void 0, void 0, void 0, function () {
    var result, i;
    return __generator(this, function (_a) {
        try {
            result = [];
            for (i = 0; i < arr.length; i++) {
                if (arr[i].order === 0 || arr[i].order === 1 || arr[i].order === 2) {
                    result.push({
                        movid: movieid,
                        id: arr[i].id,
                        name: arr[i].name,
                        rating: userRating
                    });
                }
            }
            return [2 /*return*/, result];
        }
        catch (e) {
            console.error(e, "actorCheck is failing");
        }
        return [2 /*return*/];
    });
}); };
var getMovieWithCredits = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var movie, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.get("".concat(apiUrl, "movie/").concat(id, "?api_key=").concat(APIKEY, "&append_to_response=credits"))];
            case 1:
                movie = _a.sent();
                return [2 /*return*/, movie.data];
            case 2:
                e_1 = _a.sent();
                console.error(e_1, "getMovieWithCredits is failing");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, undefined];
        }
    });
}); };
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
var genreSort = function (userEmail) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, genresNull, genres, genreArray, i, len, j, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, movielist.findOne({
                        email: userEmail
                    })];
            case 1:
                filter = _a.sent();
                genresNull = filter.genres;
                genres = genresNull.filter(function (genre) { return genre.rating; });
                if (genres.length === 0)
                    return [2 /*return*/, undefined];
                genreArray = [
                    {
                        name: genres[0].name,
                        id: genres[0].id,
                        rating: genres[0].rating,
                        count: 1
                    },
                ];
                /*
                  Collate all similar genres, add together ratings, and update count
                  Otherwise add the next genre and set count to one.
                */
                for (i = 1; i < genres.length; i++) {
                    len = genreArray.length;
                    for (j = 0; j < len; j++) {
                        if (genres[i].name === genreArray[j].name) {
                            genreArray[j].rating =
                                genreArray[j].rating + genres[i].rating;
                            genreArray[j].count++;
                            // If it has got to the end of the array. Return it.
                            if (i < genres.length - 1) {
                                continue;
                            }
                            else {
                                return [2 /*return*/, genreArray];
                            }
                            // If the genres match and it is at the last position:
                        }
                        if (genres[i].name !== genreArray[j].name && j === len - 1) {
                            genreArray.push({
                                name: genres[i].name,
                                id: genres[i].id,
                                rating: genres[i].rating,
                                count: 1
                            });
                        }
                    }
                }
                return [2 /*return*/, genreArray];
            case 2:
                e_2 = _a.sent();
                console.error(e_2, "genreSort is failing");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 *
 * @param {*} userEmail
 * @returns Similar to above, collates ratings.
 */
var directorSort = function (userEmail) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, directorsNull, directors, directorArray, i, len, j, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, movielist.findOne({
                        email: userEmail
                    })];
            case 1:
                filter = _a.sent();
                directorsNull = filter.directors;
                directors = directorsNull.filter(function (director) { return director.rating; });
                if (directors.length === 0)
                    return [2 /*return*/, undefined];
                directorArray = [
                    {
                        name: directors[0].name,
                        id: directors[0].id,
                        rating: directors[0].rating,
                        count: 1
                    },
                ];
                for (i = 1; i < directors.length; i++) {
                    len = directorArray.length;
                    for (j = 0; j < len; j++) {
                        if (directors[i].name === directorArray[j].name) {
                            directorArray[j].rating =
                                directorArray[j].rating + directors[i].rating;
                            directorArray[j].count = directorArray[j].count + 1;
                            if (i < directors.length - 1) {
                                continue;
                            }
                            else {
                                return [2 /*return*/, directorArray];
                            }
                        }
                        if (directors[i].name !== directorArray[j].name && j === len - 1) {
                            directorArray.push({
                                name: directors[i].name,
                                id: directors[i].id,
                                rating: directors[i].rating,
                                count: 1
                            });
                        }
                    }
                }
                return [2 /*return*/, directorArray];
            case 2:
                e_3 = _a.sent();
                console.error(e_3, "directorSort is failing");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var actorSort = function (userEmail) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, actorsNull, actors, actorArray, i, len, j, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, movielist.findOne({
                        email: userEmail
                    })];
            case 1:
                filter = _a.sent();
                actorsNull = filter.actors;
                actors = actorsNull.filter(function (actor) { return actor.rating; });
                if (actors.length === 0)
                    return [2 /*return*/, undefined];
                actorArray = [
                    {
                        name: actors[0].name,
                        id: actors[0].id,
                        rating: actors[0].rating,
                        count: 1
                    },
                ];
                for (i = 1; i < actors.length; i++) {
                    len = actorArray.length;
                    for (j = 0; j < len; j++) {
                        if (actors[i].name === actorArray[j].name) {
                            actorArray[j].rating =
                                actorArray[j].rating + actors[i].rating;
                            actorArray[j].count++;
                            if (i < actors.length - 1) {
                                continue;
                            }
                            else {
                                return [2 /*return*/, actorArray];
                            }
                        }
                        if (actors[i].name !== actorArray[j].name && j === len - 1) {
                            actorArray.push({
                                name: actors[i].name,
                                id: actors[i].id,
                                rating: actors[i].rating,
                                count: 1
                            });
                        }
                    }
                }
                return [2 /*return*/, actorArray];
            case 2:
                e_4 = _a.sent();
                console.error(e_4, "actorSort is failing");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/*
  This section is for prepopulating the main page, if the user has not put anything in, to have a default.


*/
var genreIDlist = [
    28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
    53, 10752, 37,
];
var genreIDlookup = {
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
    37: "Western"
};
var directorsIDlist = {
    55934: "Taika Waititi",
    488: "Steven Spielberg",
    1032: "Martin Scorsese",
    138: "Quentin Tarantino",
    578: "Ridley Scott",
    1223: "The Coen Brothers",
    525: "Christopher Nolan",
    108: "Peter Jackson"
};
var actorsIDlist = {
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
    18973: "Mila Kunis"
};
/*
  TODO remap genre ids to genre names
*/
var onLoadArrayGenreNoDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var arr, finalResponse, num, check, genreIDArr, i, i, genreName, i, apiResponse, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                arr = [];
                finalResponse = [];
                // arr to contain 3 elements with random different numbers ranging from 0-18 inclusively
                while (arr.length < 3) {
                    num = numGen(18);
                    check = duplicateCheck(num, arr);
                    if (check) {
                        arr.push(num);
                    }
                }
                genreIDArr = [];
                for (i = 0; i < arr.length; i++) {
                    genreIDArr.push(genreIDlist[arr[i]]);
                }
                /*
                  Adds the names of the genres onto the array.
                */
                // for (let i = 0; i < genreIDArr.length; i++) {
                //   const genreName = genreIDlookup[genreIDArr[i]];
                //   finalResponse.push(genreName);
                // }
                for (i = 0; i < genreIDArr.length; i++) {
                    genreName = genreIDlookup[genreIDArr[i]];
                    finalResponse.push({
                        genreName: genreName,
                        movies: []
                    });
                }
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < genreIDArr.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "discover/movie?api_key=").concat(APIKEY, "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=").concat(genreIDArr[i]))];
            case 2:
                apiResponse = _a.sent();
                finalResponse[i].movies = apiResponse.data.results;
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, finalResponse];
            case 5:
                e_5 = _a.sent();
                console.error(e_5, "onLoadArrayGenreNoDB is failing");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var onLoadDirectorNoDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var arr, finalArr, finalResponse, num, check, i, directorName, i, apiResponse, array, filteredArray, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                arr = [55934, 488, 1032, 138, 578, 1223, 525, 108];
                finalArr = [];
                finalResponse = [];
                while (finalArr.length < 2) {
                    num = Math.floor(Math.random() * 8);
                    check = duplicateCheck(arr[num], finalArr);
                    if (check) {
                        finalArr.push(arr[num]);
                    }
                }
                for (i = 0; i < finalArr.length; i++) {
                    directorName = directorsIDlist[finalArr[i]];
                    finalResponse.push({
                        directorName: directorName,
                        movies: []
                    });
                }
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < finalArr.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "person/").concat(finalArr[i], "/movie_credits?api_key=").concat(APIKEY, "&language=en-US"))];
            case 2:
                apiResponse = _a.sent();
                array = apiResponse.data.crew;
                filteredArray = array.filter(function (director) { return director.job === "Director"; });
                filteredArray.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                finalResponse[i].movies = filteredArray;
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, finalResponse];
            case 5:
                e_6 = _a.sent();
                console.error(e_6, "onLoadDirectorNoDB is failing");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/, undefined];
        }
    });
}); };
var onLoadActorNoDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var arr, finalArr, finalResponse, num, check, i, actorName, i, apiResponse, array, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                arr = [
                    287, 1283, 71580, 1136406, 62, 6193, 3896, 31, 2888, 505710, 18918, 10859,
                    1245, 139, 204, 1813, 83002, 18973,
                ];
                finalArr = [];
                finalResponse = [];
                while (finalArr.length < 2) {
                    num = Math.floor(Math.random() * 18);
                    check = duplicateCheck(arr[num], finalArr);
                    if (check) {
                        finalArr.push(arr[num]);
                    }
                }
                for (i = 0; i < finalArr.length; i++) {
                    actorName = actorsIDlist[finalArr[i]];
                    finalResponse.push({
                        actorName: actorName,
                        movies: []
                    });
                }
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < finalArr.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "person/").concat(finalArr[i], "/movie_credits?api_key=").concat(APIKEY, "&language=en-US"))];
            case 2:
                apiResponse = _a.sent();
                array = apiResponse.data.cast;
                array.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                finalResponse[i].movies = array;
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, finalResponse];
            case 5:
                e_7 = _a.sent();
                console.error(e_7, "onLoadDirectorNoDB is failing");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
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
var onLoadArrayGenreWithDB = function (array, user) { return __awaiter(void 0, void 0, void 0, function () {
    var page, max, newmax, shuffledMax, highest, genreArray, newhighest, shuffled, maxGenre, finalResponse, maxHighest, num, randomGenre, check, i, genreName, i, apiResponse, response, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                page = 1;
                max = array;
                max.sort(function (a, b) {
                    return b.count - a.count;
                });
                newmax = max.slice(0, 3);
                shuffledMax = shuffle(newmax);
                highest = array;
                /*Sorting by the ratio of rating to count */
                highest.sort(function (a, b) {
                    return b.rating / b.count - a.rating / a.count;
                });
                genreArray = [];
                newhighest = highest.slice(0, 3);
                shuffled = shuffle(newhighest);
                maxGenre = shuffledMax[0].id;
                finalResponse = [];
                if (highest.length === 1) {
                    genreArray.push(shuffled[0].id);
                }
                else if (highest.length > 1) {
                    maxHighest = shuffled[0].id;
                    if (maxHighest === maxGenre)
                        maxHighest = shuffled[1].id;
                    genreArray.push(maxGenre, maxHighest);
                }
                while (genreArray.length < 3) {
                    num = numGen(18);
                    randomGenre = genreIDlist[num];
                    check = duplicateCheck(randomGenre, genreArray);
                    if (check) {
                        genreArray.push(randomGenre);
                    }
                }
                for (i = 0; i < genreArray.length; i++) {
                    genreName = genreIDlookup[genreArray[i]];
                    finalResponse.push({
                        genreName: genreName,
                        movies: []
                    });
                }
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < genreArray.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "discover/movie?api_key=").concat(APIKEY, "&sort_by=popularity.desc&include_adult=false&include_video=false&page=").concat(page, "&with_genres=").concat(genreArray[i]))];
            case 2:
                apiResponse = _a.sent();
                response = apiResponse.data.results;
                checkIfInDB(user.movielist, response);
                finalResponse[i].movies = response;
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, finalResponse];
            case 5:
                e_8 = _a.sent();
                console.error(e_8, "onLoadArrayGenreWithDB is failing");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var onLoadArrayDirectorWithDB = function (array, user) { return __awaiter(void 0, void 0, void 0, function () {
    var directorIdArray, finalResponse, max, newmax, shuffledMax, highest, newhighest, shuffled, maxDirector, directorHighest, arr, directorIdArray_1, num, check, directorName, i, apiResponse, array_1, filteredArray, i_1, j, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                directorIdArray = [];
                finalResponse = [];
                max = array;
                if (max.length >= 2) {
                    max.sort(function (a, b) {
                        return b.count - a.count;
                    });
                    newmax = max.slice(0, 3);
                    shuffledMax = shuffle(newmax);
                    highest = array;
                    highest.sort(function (a, b) {
                        return (b.rating / b.count -
                            a.rating / a.count);
                    });
                    newhighest = highest.slice(0, 3);
                    shuffled = shuffle(newhighest);
                    maxDirector = shuffledMax[0].id;
                    finalResponse.push({
                        directorName: shuffledMax[0].name,
                        movies: []
                    });
                    directorHighest = shuffled[0].id;
                    directorHighest = shuffled[1].id;
                    finalResponse.push({
                        directorName: maxDirector === directorHighest ? shuffled[1].name : shuffled[0].name,
                        movies: []
                    });
                    directorIdArray = [maxDirector, directorHighest];
                }
                else {
                    arr = [55934, 488, 1032, 138, 578, 1223, 525, 108];
                    directorIdArray_1 = [array[0].id];
                    while (directorIdArray_1.length < 2) {
                        num = Math.floor(Math.random() * 8);
                        check = duplicateCheck(arr[num], directorIdArray_1);
                        if (check) {
                            directorIdArray_1.push(arr[num]);
                            directorName = directorsIDlist[arr[num]];
                            finalResponse.push({
                                directorName: directorName,
                                movies: []
                            });
                        }
                    }
                }
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < directorIdArray.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "person/").concat(directorIdArray[i], "/movie_credits?api_key=").concat(APIKEY, "&language=en-US"))];
            case 2:
                apiResponse = _a.sent();
                array_1 = apiResponse.data.crew;
                filteredArray = array_1.filter(function (director) { return director.job === "Director"; });
                filteredArray.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                for (i_1 = 0; i_1 < user.movielist.length; i_1++) {
                    for (j = 0; j < array_1.length; j++) {
                        if (user.movielist[i_1].id === filteredArray[j].id) {
                            filteredArray[j].inWatchlist = user.movielist[i_1].inWatchlist;
                            filteredArray[j].seen = user.movielist[i_1].seen;
                            filteredArray[j].user_rating = user.movielist[i_1]
                                .user_rating;
                        }
                    }
                }
                finalResponse[i].movies = filteredArray;
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, finalResponse];
            case 5:
                e_9 = _a.sent();
                console.error(e_9, "onLoadArrayActorWithDB is failing");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var onLoadArrayActorWithDB = function (array, user) { return __awaiter(void 0, void 0, void 0, function () {
    var actorIdArray, finalResponse, max, newmax, shuffledMax, highest, newhighest, shuffled, maxActor, actorHighest, arr, num, check, actorName, i, apiResponse, array_2, e_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                actorIdArray = [];
                finalResponse = [];
                max = array;
                if (max.length >= 2) {
                    max.sort(function (a, b) {
                        return b.count - a.count;
                    });
                    newmax = max.slice(0, 3);
                    shuffledMax = shuffle(newmax);
                    highest = array;
                    highest.sort(function (a, b) {
                        return (b.rating / b.count -
                            a.rating / a.count);
                    });
                    newhighest = highest.slice(0, 3);
                    shuffled = shuffle(newhighest);
                    maxActor = shuffledMax[0].id;
                    finalResponse.push({
                        actorName: shuffledMax[0].name,
                        movies: []
                    });
                    actorHighest = shuffled[0].id;
                    if (shuffled.length === 1) {
                        actorIdArray.push(actorHighest);
                    }
                    else if (shuffled.length > 1) {
                        if (actorHighest === maxActor) {
                            actorHighest = shuffled[1].id;
                            finalResponse.push({
                                actorName: actorHighest === maxActor ? shuffled[1].name : shuffled[0].name,
                                movies: []
                            });
                        }
                        actorIdArray.push(maxActor, actorHighest);
                    }
                }
                else {
                    arr = [
                        287, 1283, 71580, 1136406, 62, 6193, 3896, 31, 2888, 505710, 18918,
                        10859, 1245, 139, 204, 1813, 83002, 18973,
                    ];
                    actorIdArray = [array[0].id];
                    while (actorIdArray.length < 2) {
                        num = Math.floor(Math.random() * 18);
                        check = duplicateCheck(arr[num], actorIdArray);
                        if (check) {
                            actorIdArray.push(arr[num]);
                            actorName = actorsIDlist[arr[num]];
                            finalResponse.push({
                                actorName: actorName,
                                movies: []
                            });
                        }
                    }
                }
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < finalResponse.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "person/").concat(actorIdArray[i], "/movie_credits?api_key=").concat(APIKEY, "&language=en-US"))];
            case 2:
                apiResponse = _a.sent();
                array_2 = apiResponse.data.cast;
                array_2.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                checkIfInDB(user.movielist, array_2);
                finalResponse[i].movies = array_2;
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, finalResponse];
            case 5:
                e_10 = _a.sent();
                console.error(e_10, "onLoadArrayActorWithDB is failing");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
/**
 *
 * @param {*} user user movie list
 * @param {*} max The highest rating they have put for a movie
 *
 * Looks through array of MovieGenreRating for genres that match max rating.
 *
 * @returns an array of ids of their favourite genres.
 */
var findFaveGenre = function (user, max) {
    var genres = user.genres;
    var faves = [];
    for (var i = 0; i < genres.length; i++) {
        if (genres[i].rating === max) {
            faves.push(genres[i].id);
        }
    }
    return faves;
};
var findFaveDirector = function (user, max) {
    var directors = user.directors;
    var faves = [];
    for (var i = 0; i < directors.length; i++) {
        if (directors[i].rating === max) {
            faves.push(directors[i].id);
        }
    }
    return faves;
};
var findFaveActor = function (user, max) {
    var actors = user.actors;
    var faves = [];
    for (var i = 0; i < actors.length; i++) {
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
var shuffle = function (array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
            array[randomIndex],
            array[currentIndex],
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
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
var checkIfInDB = function (userDB, array) {
    for (var i = 0; i < userDB.length; i++) {
        for (var j = 0; j < array.length; j++) {
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
var onLoad = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userEmail, user_1, arr, finalResponse, i, apiResponse, shuffled, genre, genreIDArr, director, directorIDArr, actor, actorIDArr, e_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 21, , 22]);
                userEmail = req.body.email;
                return [4 /*yield*/, movielist.findOne({
                        email: userEmail
                    })];
            case 1:
                user_1 = _a.sent();
                arr = onLoadArray();
                finalResponse = [];
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < arr.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "trending/movie/day?api_key=").concat(APIKEY, "&page=").concat(arr[i]))];
            case 3:
                apiResponse = _a.sent();
                shuffled = shuffle(apiResponse.data.results);
                // update with user data.
                checkIfInDB(user_1.movielist, shuffled);
                finalResponse.push.apply(finalResponse, shuffled);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [4 /*yield*/, genreSort(userEmail)];
            case 6:
                genre = (_a.sent()) || undefined;
                genreIDArr = void 0;
                if (!(genre === undefined)) return [3 /*break*/, 8];
                return [4 /*yield*/, onLoadArrayGenreNoDB()];
            case 7:
                genreIDArr = _a.sent();
                _a.label = 8;
            case 8:
                if (!genre) return [3 /*break*/, 10];
                return [4 /*yield*/, onLoadArrayGenreWithDB(genre, user_1)];
            case 9:
                genreIDArr = _a.sent();
                _a.label = 10;
            case 10:
                finalResponse.push(genreIDArr);
                return [4 /*yield*/, directorSort(userEmail)];
            case 11:
                director = _a.sent();
                directorIDArr = void 0;
                if (!(director === undefined)) return [3 /*break*/, 13];
                return [4 /*yield*/, onLoadDirectorNoDB()];
            case 12:
                directorIDArr = _a.sent();
                _a.label = 13;
            case 13:
                if (!director) return [3 /*break*/, 15];
                return [4 /*yield*/, onLoadArrayDirectorWithDB(director, user_1)];
            case 14:
                directorIDArr = _a.sent();
                _a.label = 15;
            case 15:
                finalResponse.push(directorIDArr);
                return [4 /*yield*/, actorSort(userEmail)];
            case 16:
                actor = _a.sent();
                actorIDArr = void 0;
                if (!(actor === undefined)) return [3 /*break*/, 18];
                return [4 /*yield*/, onLoadActorNoDB()];
            case 17:
                actorIDArr = _a.sent();
                _a.label = 18;
            case 18:
                if (!actor) return [3 /*break*/, 20];
                return [4 /*yield*/, onLoadArrayActorWithDB(actor, user_1)];
            case 19:
                actorIDArr = _a.sent();
                _a.label = 20;
            case 20:
                finalResponse.push(actorIDArr);
                finalResponse.push(user_1);
                res.status(200);
                res.send(finalResponse);
                return [3 /*break*/, 22];
            case 21:
                e_11 = _a.sent();
                console.error(e_11, "onLoad is failing");
                res.status(500);
                return [3 /*break*/, 22];
            case 22: return [2 /*return*/];
        }
    });
}); };
/**
 *
 * Find a user's movie list, and separates out into
 * watchlist: What they want to watch
 * watchedMovies: what they've watched
 *
 *
 */
var onLoadWatchlist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userEmail, user_2, userMovies, watchlistMovies, watchedMovies, finalResponse, max, i, genres, shuffleGenres, faveGenres, i, apiResponse, directors, shuffleDirectors, faveDirectors, i, apiResponse, array, actors, shuffleActors, faveActors, i, apiResponse, array, arr, i, apiResponse, shuffled, e_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 18, , 19]);
                userEmail = req.body.email;
                return [4 /*yield*/, movielist.findOne({ email: userEmail })];
            case 1:
                user_2 = _a.sent();
                userMovies = user_2.movielist;
                watchlistMovies = userMovies.filter(function (movie) { return movie.seen === false; });
                watchedMovies = userMovies.filter(function (movie) { return movie.seen === true; });
                finalResponse = {};
                finalResponse.watchlistMovieLists = [];
                finalResponse.genreMovieLists = [];
                finalResponse.actorMovieLists = [];
                finalResponse.directorMovieLists = [];
                if (watchlistMovies.length > 0) {
                    finalResponse.watchlistMovieLists.push(watchlistMovies);
                }
                if (!(watchedMovies.length > 0)) return [3 /*break*/, 13];
                max = 0;
                for (i = 0; i < watchedMovies.length; i++) {
                    if (watchedMovies[i].user_rating >= max) {
                        max = watchedMovies[i].user_rating;
                    }
                }
                genres = findFaveGenre(user_2, max);
                shuffleGenres = shuffle(genres);
                faveGenres = shuffleGenres.slice(0, 2);
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < faveGenres.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "discover/movie?api_key=").concat(APIKEY, "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=").concat(faveGenres[i]))];
            case 3:
                apiResponse = _a.sent();
                finalResponse.genreMovieLists.push(apiResponse.data.results);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                directors = findFaveDirector(user_2, max);
                shuffleDirectors = shuffle(directors);
                faveDirectors = shuffleDirectors.slice(0, 2);
                i = 0;
                _a.label = 6;
            case 6:
                if (!(i < faveDirectors.length)) return [3 /*break*/, 9];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "person/").concat(faveDirectors[i], "/movie_credits?api_key=").concat(APIKEY, "&language=en-US"))];
            case 7:
                apiResponse = _a.sent();
                array = apiResponse.data.crew;
                array.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                finalResponse.directorMovieLists.push(array);
                _a.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 6];
            case 9:
                actors = findFaveActor(user_2, max);
                shuffleActors = shuffle(actors);
                faveActors = shuffleActors.slice(0, 2);
                i = 0;
                _a.label = 10;
            case 10:
                if (!(i < faveActors.length)) return [3 /*break*/, 13];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "person/").concat(faveActors[i], "/movie_credits?api_key=").concat(APIKEY, "&language=en-US"))];
            case 11:
                apiResponse = _a.sent();
                array = apiResponse.data.cast;
                array.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                finalResponse.actorMovieLists.push(array);
                _a.label = 12;
            case 12:
                i++;
                return [3 /*break*/, 10];
            case 13:
                console.log("hello after actor");
                if (!(watchedMovies.length === 0)) return [3 /*break*/, 17];
                arr = onLoadArray();
                i = 0;
                _a.label = 14;
            case 14:
                if (!(i < arr.length)) return [3 /*break*/, 17];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "trending/movie/day?api_key=").concat(APIKEY, "&page=").concat(arr[i]))];
            case 15:
                apiResponse = _a.sent();
                shuffled = shuffle(apiResponse.data.results);
                finalResponse.watchlistMovieLists.push(shuffled);
                _a.label = 16;
            case 16:
                i++;
                return [3 /*break*/, 14];
            case 17:
                checkIfInDB(userMovies, finalResponse);
                res.status(200).send(JSON.stringify(finalResponse));
                return [3 /*break*/, 19];
            case 18:
                e_12 = _a.sent();
                console.error(e_12, "onLoadWatchlist is failing");
                res.status(500);
                return [3 /*break*/, 19];
            case 19: return [2 /*return*/];
        }
    });
}); };
var onLoadWatched = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userEmail, user_3, userMovies, watchedMovies, finalResponse, max, i, genres, shuffleGenres, faveGenres, i, apiResponse, directors, shuffleDirectors, faveDirectors, i, apiResponse, array, actors, shuffleActors, faveActors, i, apiResponse, array, e_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 14, , 15]);
                userEmail = req.body.email;
                return [4 /*yield*/, movielist.findOne({ email: userEmail })];
            case 1:
                user_3 = _a.sent();
                userMovies = user_3.movielist;
                watchedMovies = userMovies.filter(function (movie) { return movie.seen === true; });
                finalResponse = [];
                if (!(watchedMovies.length > 0)) return [3 /*break*/, 13];
                finalResponse.push(watchedMovies);
                max = 0;
                for (i = 0; i < watchedMovies.length; i++) {
                    if (watchedMovies[i].user_rating >= max) {
                        max = watchedMovies[i].user_rating;
                    }
                }
                genres = findFaveGenre(user_3, max);
                shuffleGenres = shuffle(genres);
                faveGenres = shuffleGenres.slice(0, 2);
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < faveGenres.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "discover/movie?api_key=").concat(APIKEY, "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=").concat(faveGenres[i]))];
            case 3:
                apiResponse = _a.sent();
                finalResponse.push(apiResponse.data.results);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                directors = findFaveDirector(user_3, max);
                shuffleDirectors = shuffle(directors);
                faveDirectors = shuffleDirectors.slice(0, 2);
                i = 0;
                _a.label = 6;
            case 6:
                if (!(i < faveDirectors.length)) return [3 /*break*/, 9];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "person/").concat(faveDirectors[i], "/movie_credits?api_key=").concat(APIKEY, "&language=en-US"))];
            case 7:
                apiResponse = _a.sent();
                array = apiResponse.data.cast;
                array.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                finalResponse.push(array);
                _a.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 6];
            case 9:
                actors = findFaveActor(user_3, max);
                shuffleActors = shuffle(actors);
                faveActors = shuffleActors.slice(0, 2);
                i = 0;
                _a.label = 10;
            case 10:
                if (!(i < faveActors.length)) return [3 /*break*/, 13];
                return [4 /*yield*/, axios.get("".concat(apiUrl, "person/").concat(faveActors[i], "/movie_credits?api_key=").concat(APIKEY, "&language=en-US"))];
            case 11:
                apiResponse = _a.sent();
                array = apiResponse.data.cast;
                array.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                finalResponse.push(array);
                _a.label = 12;
            case 12:
                i++;
                return [3 /*break*/, 10];
            case 13:
                checkIfInDB(userMovies, finalResponse);
                res.status(200);
                res.send(finalResponse);
                return [3 /*break*/, 15];
            case 14:
                e_13 = _a.sent();
                console.error(e_13, "onLoadWatchlist is failing");
                res.status(500);
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); };
/**
 * Adds to watchlist, updates db.
 *
 *
 */
var addWatchlist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, filter, movie, genres, i, crew, director, cast, actor, update, e_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                id = req.body.id;
                filter = { email: req.body.sessionid };
                return [4 /*yield*/, getMovieWithCredits(id)];
            case 1:
                movie = (_a.sent());
                movie.inWatchlist = true;
                movie.seen = false;
                movie.user_rating = null;
                genres = movie.genres;
                for (i = 0; i < genres.length; i++) {
                    genres[i].rating = null;
                    genres[i].movid = id;
                }
                crew = movie.credits.crew;
                return [4 /*yield*/, directorCheck(crew, id, null)];
            case 2:
                director = _a.sent();
                cast = movie.credits.cast;
                return [4 /*yield*/, actorCheck(cast, id, null)];
            case 3:
                actor = _a.sent();
                return [4 /*yield*/, movielist.findOneAndUpdate(filter, {
                        $push: {
                            movielist: [movie],
                            genres: genres,
                            directors: director,
                            actors: actor
                        }
                    })];
            case 4:
                update = _a.sent();
                return [4 /*yield*/, movielist.findOne(filter)];
            case 5:
                update = _a.sent();
                res.status(200);
                res.send(update);
                return [3 /*break*/, 7];
            case 6:
                e_14 = _a.sent();
                console.error(e_14, "addWatchlist is failing");
                res.status(500);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var addWatched = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var movieid, userRating, userEmail, userList, inDB, i, filter, genreFilter, actorFilter, directorFilter, movie, genres, i, crew, director, cast, actor, update, e_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 12, , 13]);
                movieid = req.body.id;
                userRating = req.body.user_rating;
                userEmail = req.body.sessionid;
                return [4 /*yield*/, movielist.findOne({ email: userEmail })];
            case 1:
                userList = _a.sent();
                inDB = false;
                for (i = 0; i < userList.movielist.length; i++) {
                    if (userList.movielist[i].id === movieid) {
                        inDB = true;
                    }
                }
                if (!(inDB === true)) return [3 /*break*/, 6];
                return [4 /*yield*/, movielist.updateOne({
                        email: userEmail
                    }, { $pull: { movielist: { id: movieid } } })];
            case 2:
                filter = _a.sent();
                return [4 /*yield*/, movielist.updateMany({
                        email: userEmail
                    }, { $pull: { genres: { movid: movieid } } })];
            case 3:
                genreFilter = _a.sent();
                return [4 /*yield*/, movielist.updateMany({
                        email: userEmail
                    }, { $pull: { actors: { movid: movieid } } })];
            case 4:
                actorFilter = _a.sent();
                return [4 /*yield*/, movielist.updateMany({
                        email: userEmail
                    }, { $pull: { directors: { movid: movieid } } })];
            case 5:
                directorFilter = _a.sent();
                _a.label = 6;
            case 6: return [4 /*yield*/, getMovieWithCredits(movieid)];
            case 7:
                movie = (_a.sent());
                movie.inWatchlist = false;
                movie.seen = true;
                movie.user_rating = userRating;
                genres = movie.genres;
                for (i = 0; i < genres.length; i++) {
                    genres[i].rating = userRating;
                    genres[i].movid = movieid;
                }
                crew = movie.credits.crew;
                return [4 /*yield*/, directorCheck(crew, movieid, userRating)];
            case 8:
                director = _a.sent();
                cast = movie.credits.cast;
                return [4 /*yield*/, actorCheck(cast, movieid, userRating)];
            case 9:
                actor = _a.sent();
                return [4 /*yield*/, movielist.findOneAndUpdate({ email: userEmail }, {
                        $push: {
                            movielist: [movie],
                            genres: genres,
                            directors: director,
                            actors: actor
                        }
                    })];
            case 10:
                update = _a.sent();
                return [4 /*yield*/, movielist.findOne({ email: userEmail })];
            case 11:
                update = _a.sent();
                res.status(200);
                res.send(update);
                return [3 /*break*/, 13];
            case 12:
                e_15 = _a.sent();
                console.error(e_15, "addWatched is failing");
                res.status(500);
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
var deleteMovie = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var useremail, movieid, filter, genreFilter, actorFilter, directorFilter, e_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                useremail = req.body.sessionid;
                movieid = req.body.id;
                return [4 /*yield*/, movielist.updateOne({
                        email: useremail
                    }, { $pull: { movielist: { id: movieid } } })];
            case 1:
                filter = _a.sent();
                return [4 /*yield*/, movielist.updateMany({
                        email: useremail
                    }, { $pull: { genres: { movid: movieid } } })];
            case 2:
                genreFilter = _a.sent();
                return [4 /*yield*/, movielist.updateMany({
                        email: useremail
                    }, { $pull: { actors: { movid: movieid } } })];
            case 3:
                actorFilter = _a.sent();
                return [4 /*yield*/, movielist.updateMany({
                        email: useremail
                    }, { $pull: { directors: { movid: movieid } } })];
            case 4:
                directorFilter = _a.sent();
                res.status(200);
                res.send(filter);
                return [3 /*break*/, 6];
            case 5:
                e_16 = _a.sent();
                console.error(e_16, "deleteMovie is failing");
                res.status(500);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    duplicateCheck: duplicateCheck,
    onLoadArray: onLoadArray,
    onLoad: onLoad,
    addWatchlist: addWatchlist,
    addWatched: addWatched,
    deleteMovie: deleteMovie,
    onLoadWatchlist: onLoadWatchlist,
    onLoadWatched: onLoadWatched
};
