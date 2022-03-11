'use strict';

const mongoose = require('./index.js');
const Schema = mongoose.Schema;
/* 
	email to identify user.
	Maybe use id here?
	movieList - list of all movies 
		// either in watched or not watched.
		
*/

const movielistSchema = new Schema({
	email: {
		type: String,
		required: [true, 'email is missing'],
		unique: true,
	},
	movielist: [{
		inWatchlist: Boolean, // I want to watch it
		seen: Boolean,
		user_rating: Number, // Rating after seen.
		backdrop_path: String, // image
		belongs_to_collection: { // each movie can belong to a collection
			id: Number,
			name: String,
			poster_path: String,
			backdrop_path: String
		},
		budget: Number,
		genres: [{
			id: Number,
			name: String,
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
	}],
});

const Movielist = mongoose.model('movielist', movielistSchema);


module.exports = Movielist;