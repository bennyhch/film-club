'use strict';

import mongoose from './index.js';
const Schema = mongoose.Schema;
/* 
	email to identify user.
	Maybe use id here?
	movieList - list of all movies 
		// either in watched or not watched.
		
*/


// Document interface - Typescript
interface MovieListInfo {
	email: string;
	movielist: Array<MovieList>;
	genres: Array<Genres>;
	directors: Array<Directors>;
	actors: Array<Actors>;
}

interface MovieList {
	inWatchlist: boolean;
	seen: boolean;
	user_rating: number;
	backdrop_path: string;
	belongs_to_collection: Collection;
	budget: number;
	genres: Array<GenresMovielist>;
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
	credits: Credits;
}

interface GenresMovielist {
	id: number;
	name: string;
}

interface Collection {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}

interface CastCredit {
	id: number;
	known_for_department: string;
	name: string;
	character: string;
	credit_id: string;
	order: number;
};
interface CrewCredit {
	id: number;
	known_for_department: string;
	name: string;
	credit_id: string;
	department: string;
	job: string;
}


interface Credits {
  cast: Array<CastCredit>;
  crew: Array<CrewCredit>;
}

interface Genres {
	movid: number;
	id: number;
	name: string;
	rating: number;
}

interface Directors {
	movid: number;
	id: number;
	name: string;
	rating: number;
}

interface Actors {
	movid: number;
	id: number;
	name: string;
	rating: number;
}

// Schema
const movielistSchema = new Schema <MovieListInfo> ({
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
	}]
});

const Movielist = mongoose.model('movielist', movielistSchema);


module.exports = Movielist;