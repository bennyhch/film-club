import "./App.css";
import React, { useEffect, useState } from "react";
// import logo from "./images/film-club-logos_black.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/login";
import Home from "./Home/home";
import Watched from "./Watched/watched";
import Watchlist from "./Watchlist/watchlist";
import Collections from "./Collections/collections";
import service from "./service";
import { useCookies } from "react-cookie";
// import authAPI from './authAPI';

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
    service
      .getOnLoadHome(cookies.sessionid)
      .then((response) => {
        const genres = response[200];
        const directors = response[201];
        const actors = response[202];
        const user = response[203];
        const userMovielist = user.movielist;
        const watchlistMovies = userMovielist.filter(
          (movie) => movie.seen === false
        );
        const watchedMovies = userMovielist.filter(
          (movie) => movie.seen === true
        );
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
      .catch((error) => {
        console.log(error, "error occurred on load");
      });
  }, []);

  // Add to watchlist
  /* 
    Sends film to server.
    Server responds with the new watchlist.
    sets new watchlist
    Sets genres, actors and directors, same as before.
  */
  const addWatchlistFromHome = async (filmToAdd) => {
    filmToAdd.sessionid = cookies.sessionid;
    
    const response = await service.addWatchlistFromHome(filmToAdd);
    const newUserMovieList = response.movielist;
    setUserMovielist(newUserMovieList);
    const newUserWatchlist = response.movielist.filter(
      (movie) => movie.seen === false
      );
      setWatchlistMovies(newUserWatchlist);
      const newUserGenreList = response.genres;
      setUserGenrelist(newUserGenreList);
      const newUserActorList = response.actors;
      setUserActorlist(newUserActorList);
      const newUserDirectorList = response.directors;
      setUserDirectorlist(newUserDirectorList);

      let newMovies = movies.slice(0, 200);
      for (const movie of newMovies) {
        if (movie.id === filmToAdd.id) {
          movie.seen = false;
          movie.inWatchlist = true;
          movie.user_rating = null;
          setMovies(newMovies);
        }
      }

    let newGenres = genres.slice();
    for (const genre of newGenres) {
      if (genre.length > 0) {
        for (const film of genre.movies) {
          /* 
            TODO refactor to find().
          */
          if (film.id === filmToAdd.id) {
            film.seen = false;
            film.inWatchlist = true;
            film.user_rating = null;
          }
        }
        setGenres(newGenres);
      }
    }
    if (directors) {

      let newDirectors = directors.slice();
      for (const director of newDirectors) {
        if (director.length > 0) {
          for (const film of director.movies) {
            if (film.id === filmToAdd.id) {
              film.seen = false;
              film.inWatchlist = true;
              film.user_rating = null;
            }
          }
          setDirectors(newDirectors);
        }
      }

    }
    
    if (actors) {

      let newActors = actors.slice();
      for (const actor of newActors) {
        if (actor.length > 0) {
          for (const film of actor.movies) {
            if (film.id === filmToAdd.id) {
              film.seen = false;
              film.inWatchlist = true;
              film.user_rating = null;
            }
          }
          setActors(newActors);
        }
      }
    }
  };

  // Add watched
  const addWatchedFromHome = async (element, userRating) => {
    element.sessionid = cookies.sessionid;
    element.user_rating = userRating;
    const response = await service.addWatchedFromHome(element);
    console.log("user movie list before", userMovielist);
    const newUserMovieList = response.movielist;
    setUserMovielist(newUserMovieList);
    const newUserWatched = response.movielist.filter(
      (movie) => movie.seen === false
      );

    console.log("user movie list after", newUserWatched);
    setWatchlistMovies(newUserWatched);
    const newUserGenreList = response.genres;
    setUserGenrelist(newUserGenreList);
    const newUserActorList = response.actors;
    setUserActorlist(newUserActorList);
    const newUserDirectorList = response.directors;
    setUserDirectorlist(newUserDirectorList);
    let newMovies = movies.slice(0, 200);
    for (const el of newMovies) {
      if (el.id === element.id) {
        el.seen = true;
        el.inWatchlist = false;
        el.user_rating = userRating;
        setMovies(newMovies);
      }
    }

    if (genres) {
      let newGenres = genres.slice();
      for (const el of newGenres) {
        if (el.length > 0) {
          for (const e of el.movies) {
            if (e.id === element.id) {
              e.seen = true;
              e.inWatchlist = false;
              e.user_rating = userRating;
            }
          }
          setGenres(newGenres);
        }
      }
    }
      
    if (directors) {
      let newDirectors = directors.slice();
      for (const el of newDirectors) {
        if (el.length > 0) {
          for (const e of el.movies) {
            if (e.id === element.id) {
              e.seen = true;
              e.inWatchlist = false;
              e.user_rating = userRating;
            }
          }
          setDirectors(newDirectors);
        }
      }
    }

    if (actors) {
      let newActors = actors.slice();
      for (const el of newActors) {
        if (el.length > 0) {
          for (const e of el.movies) {
            if (e.id === element.id) {
              e.seen = true;
              e.inWatchlist = false;
              e.user_rating = userRating;
            }
          }
          setActors(newActors);
        }
      }
    }

  };

  // Delete
  const deleteMovieFromHome = async (element) => {
    element.sessionid = cookies.sessionid;
    let newUserMovieList;
    const response = await service.deleteMovieFromHome(element);
    let usermovielist = userMovielist.slice();
    for (const el of usermovielist) {
      if (el.id === element.id) {
        el.seen = false;
        el.inWatchlist = false;
        el.user_rating = null;
        newUserMovieList = usermovielist.filter(
          (movie) => movie.id !== element.id
        );
        setUserMovielist(newUserMovieList);
      }
    }
    const newUserWatchlist = newUserMovieList.filter(
      (movie) => movie.seen === false
    );
    setWatchlistMovies(newUserWatchlist);
    let newMovies = movies.slice();
    for (const el of newMovies) {
      if (el.id === element.id) {
        el.seen = false;
        el.inWatchlist = false;
        el.user_rating = null;
        setMovies(newMovies);
      }
    }
    let newGenres = genres.slice();
    for (const el of newGenres.movies) {
      if (el.length > 0) {
        for (const e of el) {
          if (e.id === element.id) {
            e.seen = false;
            e.inWatchlist = false;
            e.user_rating = null;
          }
        }
        setGenres(newGenres);
      }
    }
    let newDirectors = directors.slice();
    for (const el of newDirectors.movies) {
      if (el.length > 0) {
        for (const e of el) {
          if (e.id === element.id) {
            e.seen = false;
            e.inWatchlist = false;
            e.user_rating = null;
          }
        }
        setDirectors(newDirectors);
      }
    }
    let newActors = actors.slice();
    for (const el of newActors.movies) {
      if (el.length > 0) {
        for (const e of el) {
          if (e.id === element.id) {
            e.seen = false;
            e.inWatchlist = false;
            e.user_rating = null;
          }
        }
        setActors(newActors);
      }
    }
    let usergenrelist = userGenrelist.slice();
    const newUserGenreList = usergenrelist.filter(
      (genre) => genre.movid !== element.id
    );
    setUserGenrelist(newUserGenreList);
    let useractorlist = userActorlist.slice();
    const newUserActorList = useractorlist.filter(
      (actor) => actor.movid !== element.id
    );
    setUserActorlist(newUserActorList);
    let userdirectorlist = userDirectorlist.slice();
    const newUserDirectorList = userdirectorlist.filter(
      (director) => director.movid !== element.id
    );
    setUserDirectorlist(newUserDirectorList);
  };

  return (
    <div>
      {/* <authAPI.Provider value={{auth, setAuth}}> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Home
                actors={actors}
                directors={directors}
                genres={genres}
                movies={movies}
                userMovielist={userMovielist}
                userActorlist={userActorlist}
                userDirectorlist={userDirectorlist}
                userGenrelist={userGenrelist}
                deleteMovieFromHome={deleteMovieFromHome}
                watchlistMovies={[watchlistMovies, setWatchlistMovies]}
                watchedMovies={watchedMovies}
                addWatchlistFromHome={addWatchlistFromHome}
                addWatchedFromHome={addWatchedFromHome}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                actors={actors}
                directors={directors}
                genres={genres}
                setGenres={setGenres}
                setActors={setActors}
                setDirectors={setDirectors}
                movies={movies}
                userMovielist={[userMovielist, setUserMovielist]}
                userActorlist={userActorlist}
                userDirectorlist={userDirectorlist}
                userGenrelist={userGenrelist}
                deleteMovieFromHome={deleteMovieFromHome}
                watchlistMovies={watchlistMovies}
                watchedMovies={watchedMovies}
                addWatchlistFromHome={addWatchlistFromHome}
                addWatchedFromHome={addWatchedFromHome}
                setWatchlistMovies={setWatchlistMovies}
              />
            }
          />
          <Route
            path="/watched"
            element={
              <Watched
                actors={actors}
                directors={directors}
                genres={genres}
                movies={movies}
                userMovielist={[userMovielist, setUserMovielist]}
                userActorlist={userActorlist}
                userDirectorlist={userDirectorlist}
                userGenrelist={userGenrelist}
                deleteMovieFromHome={deleteMovieFromHome}
                watchlistMovies={watchlistMovies}
                watchedMovies={watchedMovies}
                addWatchlistFromHome={addWatchlistFromHome}
                addWatchedFromHome={addWatchedFromHome}
              />
            }
          />
          <Route path="/collections" element={<Collections />} />
        </Routes>
      </Router>
      {/* </authAPI.Provider> */}
    </div>
  );
}

export default App;
