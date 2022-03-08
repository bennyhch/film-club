
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

  useEffect(() => {
    service.getOnLoadHome(cookies.sessionid)
      .then(response => {
        const genres = response[200];
        const directors = response[201];
        const actors = response[202];
        setMovies(response);
        setGenres(genres);
        console.log(genres[3].map(el => el.id))
        setActors(actors);
        setDirectors(directors);
      })
      .catch(error => {
        console.log(error, 'error occurred on load')
      })
  }, [])

  return (
    <div>
      {/* <authAPI.Provider value={{auth, setAuth}}> */}
        <Router>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home actors={actors} directors={directors} genres={genres} movies={movies}/>} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/watched" element={<Watched />} />
            <Route path="/collections" element={<Collections />} />
          </Routes>
        </Router>
      {/* </authAPI.Provider> */}
    </div>
  );
}

export default App;
