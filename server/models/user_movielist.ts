'use strict';

const mongoose = require('./index.js');
const Schema = mongoose.Schema;
/* 
	email to identify user.
	Maybe use id here?
	movieList - list of all movies 
		// either in watched or not watched.
		
*/


// Document interface - Typescript
interface movieList {
	inWatchlist: boolean;
	seen: boolean;
	user_rating: number;
	backdrop_path: string;
	// belongs to collection 
	budget: number;
	// genres
	homepage: string;
	id: number;
	imdb_id: string,
	original_language: string;
	original_title: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	revenue: number;
	runtime: number;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	//credits
}



type CastCredit = {
  character: string;
  credit_id: string;
  release_date?: string;
  vote_count?: number;
  video: false;
  adult: false;
  vote_average: number;
  title: string;
  genre_ids: Array<number>;
  original_language: string;
  original_title: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
};

interface CrewCredit {
  id: number;
  name: string;
  department: string;
  original_language: string;
  original_title: string;
  job: string;
  overview: string;
  vote_count: number;
  video: boolean;
  poster_path: string;
  backdrop_path: string;
  title: string;
  popularity: number;
  genre_ids: [12, 18, 14, 878];
  vote_average: number;
  adult: boolean;
  release_date: string;
  credit_id: string;
  inWatchlist: boolean;
  seen: boolean;
  user_rating: number;
}

interface Credits {
  cast: Array<CastCredit>;
  crew: Array<CrewCredit>;
}


// Schema
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