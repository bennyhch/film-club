'use strict';

require('dotenv').config();
const user = require('../models/user');
const moviecollection = require('../models/user_collections')
const movielist = require('../models/user_movielist')
const axios = require('axios');
const { collection } = require('../models/user');
const apiUrl = 'https://api.themoviedb.org/3/';
const APIKEY = process.env.API_KEY

const personToID = async (name) => {
	try {
		const person = await axios.get(`${apiUrl}search/person?api_key=${APIKEY}&language=en-US&query=${name}`);
		return person.data.results[0].id;
	} catch (e) {
		console.error(e, 'personToID is failing');
	}
};

const checkIfInDB = (userDB, array) => {
	let match;
	for (let i = 0; i < userDB.length; i++) {
		for (let j = 0; j < array.length; j++) {
				if (userDB[i].id === array[j].id) {
					array[j].inWatchlist = userDB[i].inWatchlist;
					array[j].seen = userDB[i].seen;
					array[j].user_rating = userDB[i].user_rating
			}
		}
	}
}

const onLoadCollections = async (req, res) => {
	try {
		const userEmail = req.session.userEmail;
		const user = await moviecollection.findOne({ email: userEmail });
		const usermovies = user.moviecoll;
		const userperson = user.person
		res.status(200);
		res.send([usermovies, userperson]);
	} catch (e) {
		console.error(e, 'onLoadCollections is failing');
		res.status(500);
	}
};

const addActorCollection = async (req, res) => {
	try {
		const actorid = await personToID(req.body.name);
		const apiResponse = await axios.get(`${apiUrl}person/${actorid}/movie_credits?api_key=${APIKEY}&language=en-US`);
		const array = apiResponse.data.cast;
		array.sort(function (a, b) {
			return b.popularity - a.popularity
		});
		for (let i = 0; i < array.length; i++) {
			array[i].collectionID = actorid
		}
		const user = await movielist.findOne({ email: req.session.userEmail });
		const userMovies = user.movielist
		checkIfInDB(userMovies, array)
		const insertPerson = {
			id: actorid,
			name: req.body.name,
		}
		let update = await moviecollection.findOneAndUpdate({ email: req.session.userEmail }, {
			$push: {
				moviecoll: array,
				person: insertPerson
			}
		});
		update = await moviecollection.findOne({ email: req.session.userEmail });
		res.status(200);
		res.send(array);
	} catch (e) {
		console.error(e, 'addCollection is failing');
		res.status(500);
	}
};

const deleteCollection = async (req, res) => {
	try {
		const actorid = await personToID(req.body.name);
		const filter = { email: req.session.userEmail };
		const deleted = await moviecollection.updateMany({
			filter
		}, { $pull: { person: { id: actorid } } });
		const collectionDelete = await moviecollection.updateMany({
			filter
		}, { $pull: { moviecoll: { collectionID: actorid } } });
		res.status(200);
		res.send(filter);
	} catch (e) {
			console.error(e, 'deleteCollection is failing');
			res.status(500);
	}
};

const addDirectorCollection = async (req, res) => {
	try {
		const directorid = await personToID(req.body.name);
		const apiResponse = await axios.get(`${apiUrl}person/${directorid}/movie_credits?api_key=${APIKEY}&language=en-US`);
		const array = apiResponse.data.crew;
		const filteredArray = array.filter(director => director.job === 'Director')
		filteredArray.sort(function (a, b) {
			return b.popularity - a.popularity
		})
		for (let i = 0; i < filteredArray.length; i++) {
			filteredArray[i].collectionID = directorid
		}
		const user = await movielist.findOne({ email: req.session.userEmail });
		const userMovies = user.movielist
		checkIfInDB(userMovies, filteredArray)
		const insertPerson = {
			id: directorid,
			name: req.body.name,
		}
		let update = await moviecollection.findOneAndUpdate({ email: req.session.userEmail }, {
			$push: {
				moviecoll: filteredArray,
				person: insertPerson
			}
		});
		update = await moviecollection.findOne({ email: req.session.userEmail });
		res.status(200);
		res.send(filteredArray);
	} catch (e) {
		console.error(e, 'addCollection is failing');
		res.status(500);
	}
};


module.exports = { onLoadCollections, addActorCollection, deleteCollection, addDirectorCollection };