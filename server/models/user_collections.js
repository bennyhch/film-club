'use strict';
exports.__esModule = true;
var index_js_1 = require("./index.js");
var Schema = index_js_1["default"].Schema;
/*
    A collection of movies.
    user id.
    and email? hmm.
    The collection:
    An array of movies
*/
var moviecollectionSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is missing'],
        unique: true
    },
    person: {
        id: Number,
        name: String
    },
    moviecoll: [{
            collectionID: Number,
            inWatchlist: Boolean,
            seen: Boolean,
            user_rating: Number,
            poster_path: String,
            vote_average: Number,
            overview: String,
            release_date: String,
            title: String,
            id: Number,
            character: String
        }]
});
var Moviecollection = index_js_1["default"].model('moviecollection', moviecollectionSchema);
module.exports = Moviecollection;
