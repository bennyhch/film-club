
import './App.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import logo from "./images/film-club-logos_black.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from "./Login/login";
import Home from "./Home/home";
import Watched from './Watched/watched';
import Watchlist from './Watchlist/watchlist';
import Collections from './Collections/collections';
import service from './service';
import { useCookies } from "react-cookie";
import { Component } from 'react';
import authAPI from './authAPI';



function App() {

  const [cookies, setCookie] = useCookies();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [userMovielist, setUserMovielist] = useState([]);
  const [userGenrelist, setUserGenrelist] = useState([]);
  const [userActorlist, setUserActorlist] = useState([]);
  const [userDirectorlist, setUserDirectorlist] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    service.getOnLoadHome(cookies.sessionid)
      .then(response => {
        console.log(response)
        const genres = response[200];
        const directors = response[201];
        const actors = response[202];
        const user = response[203];
        const userMovielist = user.movielist;
        const watchlistMovies = userMovielist.filter(movie => movie.seen === false);
        const watchedMovies = userMovielist.filter(movie => movie.seen === true);
        const userGenrelist = user.genres;
        const userActorlist = user.actors;
        const userDirectorlist = user.directors;
        setWatchlistMovies(watchlistMovies);
        setWatchedMovies(watchedMovies);
        setMovies(response);
        setGenres(genres);
        setActors(actors);
        setDirectors(directors);
        setUserMovielist(userMovielist);
        setUserGenrelist(userGenrelist);
        setUserActorlist(userActorlist);
        setUserDirectorlist(userDirectorlist);
      })
      .catch(error => {
        console.log(error, 'error occurred on load')
      })
  }, [])

  const addWatchlistFromHome = async (element) => {
    element.sessionid = cookies.sessionid;
    const response = await service.addWatchlistFromHome(element);
    const newUserMovieList = response.movielist
    setUserMovielist(newUserMovieList);
    const newUserWatchlist = response.movielist.filter(movie => movie.seen === false);
    setWatchlistMovies(newUserWatchlist);
    const newUserGenreList = response.genres
    setUserGenrelist(newUserGenreList)
    const newUserActorList = response.actors
    setUserActorlist(newUserActorList)
    const newUserDirectorList = response.directors
    setUserDirectorlist(newUserDirectorList);
    let newMovies = movies.slice();
    for (const el of newMovies) {
      if (el.id === element.id) {
        el.seen = false;
        el.inWatchlist = true;
        el.user_rating = null;
        setMovies(newMovies)
      }
    }
    let newGenres = genres.slice();
    for (const el of newGenres) {
      if (el.length > 0) {
        for (const e of el) {
          if (e.id === element.id) {
            e.seen = false;
            e.inWatchlist = true;
            e.user_rating = null;
          }
        }
        setGenres(newGenres)
      }
    }
    let newDirectors = directors.slice();
    for (const el of newDirectors) {
      if (el.length > 0) {
        for (const e of el) {
          if (e.id === element.id) {
            e.seen = false;
            e.inWatchlist = true;
            e.user_rating = null;
          }
        }
        setDirectors(newDirectors)
      }
    }
    let newActors = actors.slice();
    for (const el of newActors) {
      if (el.length > 0) {
        for (const e of el) {
          if (e.id === element.id) {
            e.seen = false;
            e.inWatchlist = true;
            e.user_rating = null;
          }
        }
        setActors(newActors)
      }
    }
  }

  const addWatchedFromHome = async (element, userRating) => {
    element.sessionid = cookies.sessionid;
    element.user_rating = userRating
    const response = await service.addWatchedFromHome(element);
    const newUserMovieList = response.movielist
    setUserMovielist(newUserMovieList);
    const newUserWatched = response.movielist.filter(movie => movie.seen === true);
    setWatchlistMovies(newUserWatched);
    const newUserGenreList = response.genres
    setUserGenrelist(newUserGenreList)
    const newUserActorList = response.actors
    setUserActorlist(newUserActorList)
    const newUserDirectorList = response.directors
    setUserDirectorlist(newUserDirectorList);
    let newMovies = movies.slice();
    for (const el of newMovies) {
      if (el.id === element.id) {
        el.seen = true;
        el.inWatchlist = false;
        el.user_rating = userRating;
        setMovies(newMovies)
      }
    }
    let newGenres = genres.slice();
    for (const el of newGenres) {
      if (el.length > 0) {
        for (const e of el) {
          if (e.id === element.id) {
            e.seen = true;
            e.inWatchlist = false;
            e.user_rating = userRating;
          }
        }
        setGenres(newGenres)
      }
    }
    let newDirectors = directors.slice();
    for (const el of newDirectors) {
      if (el.length > 0) {
        for (const e of el) {
          if (e.id === element.id) {
            e.seen = true;
            e.inWatchlist = false;
            e.user_rating = userRating;
          }
        }
        setDirectors(newDirectors)
      }
    }
    let newActors = actors.slice();
    for (const el of newActors) {
      if (el.length > 0) {
        for (const e of el) {
          if (e.id === element.id) {
            e.seen = true;
            e.inWatchlist = false;
            e.user_rating = userRating;
          }
        }
        setActors(newActors)
      }
    }
  };

  const deleteMovieFromHome = async (element) => {
    element.sessionid = cookies.sessionid;
    let newUserMovieList
    const response = await service.deleteMovieFromHome(element);
    let usermovielist = userMovielist.slice();
    for (const el of usermovielist) {
      if (el.id === element.id) {
        el.seen = false;
        el.inWatchlist = false;
        el.user_rating = null;
        newUserMovieList = usermovielist.filter(movie => movie.id !== element.id);
        setUserMovielist(newUserMovieList)
      }
    }
    const newUserWatchlist = newUserMovieList.filter(movie => movie.seen === false);
    setWatchlistMovies(newUserWatchlist);
    let newMovies = movies.slice();
    for (const el of newMovies) {
      if (el.id === element.id) {
        el.seen = false;
        el.inWatchlist = false;
        el.user_rating = null;
        setMovies(newMovies)
      }
    }
    let newGenres = genres.slice();
    for (const el of newGenres) {
      if (el.length > 0) {
        for (const e of el) {
          if (e.id === element.id) {
            e.seen = false;
            e.inWatchlist = false;
            e.user_rating = null;
          }
        }
        setGenres(newGenres)
      }
    }
    let newDirectors = directors.slice();
    for (const el of newDirectors) {
      if (el.length > 0) {
        for (const e of el) {
          if (e.id === element.id) {
            e.seen = false;
            e.inWatchlist = false;
            e.user_rating = null;
          }
        }
        setDirectors(newDirectors)
      }
    }
    let newActors = actors.slice();
    for (const el of newActors) {
      if (el.length > 0) {
        for (const e of el) {
          if (e.id === element.id) {
            e.seen = false;
            e.inWatchlist = false;
            e.user_rating = null;
          }
        }
        setActors(newActors)
      }
    }
    let usergenrelist = userGenrelist.slice();
    const newUserGenreList = usergenrelist.filter(genre => genre.movid !== element.id);
    setUserGenrelist(newUserGenreList)
    let useractorlist = userActorlist.slice();
    const newUserActorList = useractorlist.filter(actor => actor.movid !== element.id);
    setUserActorlist(newUserActorList)
    let userdirectorlist = userDirectorlist.slice();
    const newUserDirectorList = userdirectorlist.filter(director => director.movid !== element.id);
    setUserDirectorlist(newUserDirectorList);
  }

  return (
    <div>
      {/* <authAPI.Provider value={{auth, setAuth}}> */}
        <Router>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home actors={actors} directors={directors} genres={genres} movies={movies} userMovielist={userMovielist} userActorlist={userActorlist} userDirectorlist={userDirectorlist} userGenrelist={userGenrelist} deleteMovieFromHome={deleteMovieFromHome} watchlistMovies={[watchlistMovies, setWatchlistMovies]} watchedMovies={watchedMovies} addWatchlistFromHome={addWatchlistFromHome} addWatchedFromHome={addWatchedFromHome}/>} />
          <Route path="/watchlist" element={<Watchlist actors={actors} directors={directors} genres={genres} movies={movies} userMovielist={[userMovielist, setUserMovielist]} userActorlist={userActorlist} userDirectorlist={userDirectorlist} userGenrelist={userGenrelist} deleteMovieFromHome={deleteMovieFromHome} watchlistMovies={watchlistMovies} watchedMovies={watchedMovies} addWatchlistFromHome={addWatchlistFromHome} addWatchedFromHome={addWatchedFromHome}/>} />
          <Route path="/watched" element={<Watched actors={actors} directors={directors} genres={genres} movies={movies} userMovielist={[userMovielist, setUserMovielist]} userActorlist={userActorlist} userDirectorlist={userDirectorlist} userGenrelist={userGenrelist} deleteMovieFromHome={deleteMovieFromHome} watchlistMovies={watchlistMovies} watchedMovies={watchedMovies} addWatchlistFromHome={addWatchlistFromHome} addWatchedFromHome={addWatchedFromHome} />} />
            <Route path="/collections" element={<Collections />} />
          </Routes>
        </Router>
      {/* </authAPI.Provider> */}
    </div>
  );
}

export default App;
