'use strict';
exports.__esModule = true;
var index_js_1 = require("./index.js");
var Schema = index_js_1["default"].Schema;
;
// Schema
var movielistSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is missing'],
        unique: true
    },
    movielist: [{
            inWatchlist: Boolean,
            seen: Boolean,
            user_rating: Number,
            backdrop_path: String,
            belongs_to_collection: {
                id: Number,
                name: String,
                poster_path: String,
                backdrop_path: String
            },
            budget: Number,
            genres: [{
                    id: Number,
                    name: String
                }],
            homepage: String,
            id: Number,
            imdb_id: String,
            original_language: String,
            original_title: String,
            popularity: Number,
            poster_path: String,
            release_date: String,
            revenue: Number,
            runtime: Number,
            tagline: String,
            title: String,
            video: Boolean,
            vote_average: Number,
            vote_count: Number,
            credits: {
                cast: [
                    {
                        id: Number,
                        known_for_department: String,
                        name: String,
                        character: String,
                        credit_id: String,
                        order: Number
                    }
                ],
                crew: [
                    {
                        id: Number,
                        known_for_department: String,
                        name: String,
                        credit_id: String,
                        department: String,
                        job: String
                    }
                ]
            }
        }],
    genres: [{
            movid: Number,
            id: Number,
            name: String,
            rating: Number
        }],
    directors: [{
            movid: Number,
            id: Number,
            name: String,
            rating: Number
        }],
    actors: [{
            movid: Number,
            id: Number,
            name: String,
            rating: Number
        }]
});
var Movielist = index_js_1["default"].model('movielist', movielistSchema);
module.exports = Movielist;
