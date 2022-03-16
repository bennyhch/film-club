'use strict';

import moviecollection from '../models/user_collections';
import movielist from '../models/user_movielist';
import axios from 'axios';
import { Request, Response } from 'express';
const apiUrl = 'https://api.themoviedb.org/3/';
const APIKEY = process.env.API_KEY;

// Person. This matches to 'Credit' but more general.
// Name passed in to this returns the

const personToID = async (name: string) => {
  try {
    const person = await axios.get(
      `${apiUrl}search/person?api_key=${APIKEY}&language=en-US&query=${name}`
    );
    return person.data.results[0].id;
  } catch (e) {
    console.error(e, 'personToID is failing');
  }
};
/* 
	// NOTE: Can the database do this automatically?
*/

/**
 *
 * @param {[]} userDB The user's movie list
 * @param {*} array
 */
const checkIfInDB = (
  userDB: Array<MovieListItem>,
  array: Array<MovieListItem>
) => {
  let match;
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

const onLoadCollections = async (req: Request, res: Response) => {
  try {
    const userEmail = req.body.email;
    const user = await moviecollection.findOne({ email: userEmail });
    const usermovies = user.moviecoll;
    const userperson = user.person;
    res.status(200);
    res.send([usermovies, userperson]);
  } catch (e) {
    console.error(e, 'onLoadCollections is failing');
    res.status(500);
  }
};

const addActorCollection = async (req: Request, res: Response) => {
  try {
    // req.body.name = name of the actor.
    const actorid = await personToID(req.body.name);
    // The movies that person has been in
    const apiResponse = await axios.get(
      `${apiUrl}person/${actorid}/movie_credits?api_key=${APIKEY}&language=en-US`
    );
    // The cast in the movies
    const array = apiResponse.data.cast;
    // sorting cast by popularity
    array.sort(function (a: MovieListItem, b: MovieListItem) {
      return b.popularity - a.popularity;
    });
    //
    for (let i = 0; i < array.length; i++) {
      array[i].collectionID = actorid;
    }
    const user: MovieListInfo = (await movielist.findOne({
      email: req.body.email,
    })) as MovieListInfo;
    const userMovies = user.movielist as MovieListItem[];
    checkIfInDB(userMovies, array);
    const insertPerson = {
      id: actorid,
      name: req.body.name,
    };
    let update = await moviecollection.findOneAndUpdate(
      { email: req.body.email },
      {
        $push: {
          moviecoll: array,
          person: insertPerson,
        },
      }
    );
    update = await moviecollection.findOne({ email: req.body.email });
    res.status(200);
    res.send(array);
  } catch (e) {
    console.error(e, 'addCollection is failing');
    res.status(500);
  }
};

const deleteCollection = async (req: Request, res: Response) => {
  try {
    const actorid = await personToID(req.body.name);
    const filter = { email: req.body.email };
    const deleted = await moviecollection.updateMany(
      {
        filter,
      },
      { $pull: { person: { id: actorid } } }
    );
    const collectionDelete = await moviecollection.updateMany(
      {
        filter,
      },
      { $pull: { moviecoll: { collectionID: actorid } } }
    );
    res.status(200);
    res.send(filter);
  } catch (e) {
    console.error(e, 'deleteCollection is failing');
    res.status(500);
  }
};

const addDirectorCollection = async (req: Request, res: Response) => {
  try {
    const directorid = await personToID(req.body.name);
    const apiResponse = await axios.get(
      `${apiUrl}person/${directorid}/movie_credits?api_key=${APIKEY}&language=en-US`
    );
    const array = apiResponse.data.crew;
    const filteredArray = array.filter(
      (director: CrewCredit) => director.job === 'Director'
    );
    filteredArray.sort(function (a: CrewCredit, b: CrewCredit) {
      return b.popularity - a.popularity;
    });
    for (let i = 0; i < filteredArray.length; i++) {
      filteredArray[i].collectionID = directorid;
    }
    const user = (await movielist.findOne({
      email: req.body.email,
    })) as MovieListInfo;
    const userMovies = user.movielist as MovieListItem[];
    checkIfInDB(userMovies, filteredArray);
    const insertPerson = {
      id: directorid,
      name: req.body.name,
    };
    let update = await moviecollection.findOneAndUpdate(
      { email: req.body.email },
      {
        $push: {
          moviecoll: filteredArray,
          person: insertPerson,
        },
      }
    );
    update = await moviecollection.findOne({ email: req.body.email });
    res.status(200);
    res.send(filteredArray);
  } catch (e) {
    console.error(e, 'addCollection is failing');
    res.status(500);
  }
};

module.exports = {
  onLoadCollections,
  addActorCollection,
  deleteCollection,
  addDirectorCollection,
};
