import "./App.css";
import React, { createContext, useEffect, useState } from "react";
// import logo from "./images/film-club-logos_black.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/login";
import Home from "./Home/home";
import Watched from "./Watched/watched";
import Watchlist from "./Watchlist/watchlist";
import Collections from "./Collections/collections";
import service from "./service";
import { useCookies } from "react-cookie";
import { ContextProps, HomeProps } from "./PropTypes";
import Header from "./Header/header";
// import authAPI from './authAPI';

export const MovieContext = createContext<ContextProps>({} as ContextProps);

function App() {
  const [cookies, setCookie] = useCookies();
  const [movies, setMovies] = useState<Array<APIMovieWithGenre>>([]);
  const [genres, setGenres] = useState<Array<NewGenreList>>([]);
  const [actors, setActors] = useState<Array<ListByType<CastCredit>>>([]);
  const [directors, setDirectors] = useState<Array<ListByType<CrewCredit>>>([]);
  const [userMovielist, setUserMovielist] = useState<Array<Movie>>([]);
  const [userGenrelist, setUserGenrelist] = useState<Array<MovieGenreRating>>(
    []
  );
  const [userActorlist, setUserActorlist] = useState<Array<UserActorRating>>(
    []
  );
  const [userDirectorlist, setUserDirectorlist] = useState<
    Array<UserDirectorRating>
  >([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Array<Movie>>([]);
  const [watchedMovies, setWatchedMovies] = useState<Array<Movie>>([]);

  useEffect(() => {
    service
      .getOnLoadHome(cookies.sessionid)
      .then((response) => {
        const movies: Array<APIMovieWithGenre> = response.slice(0, 200);
        const genres: Array<NewGenreList> = response[200];
        const directors: Array<ListByType<CrewCredit>> = response[201];
        const actors: Array<ListByType<CastCredit>> = response[202];
        const user: UserMovieList = response[203];
        const userMovielist: Array<Movie> = user.movielist;
        const watchlistMovies: Array<Movie> = userMovielist.filter(
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

  const addWatchlistFromHome = async (filmToAdd: Movie) => {
    // filmToAdd.sessionid = cookies.sessionid;

    const response = await service.addWatchlistFromHome(filmToAdd);
    const newUserMovieList = response.movielist;
    setUserMovielist(newUserMovieList);
    const newUserWatchlist = response.movielist.filter(
      (movie: Movie) => movie.seen === false
    );
    setWatchlistMovies(newUserWatchlist);
    const newUserGenreList = response.genres;
    setUserGenrelist(newUserGenreList);
    const newUserActorList = response.actors;
    setUserActorlist(newUserActorList);
    const newUserDirectorList = response.directors;
    setUserDirectorlist(newUserDirectorList);

    const newMovies = movies.slice(0, 200);
    for (const movie of newMovies) {
      if (movie.id === filmToAdd.id) {
        movie.seen = false;
        movie.inWatchlist = true;
        movie.user_rating = null;
        setMovies(newMovies);
      }
    }

    const newGenres = genres.slice();
    for (const genre of newGenres) {
      if (genre.movies.length > 0) {
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
      const newDirectors = directors.slice();
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
      const newActors = actors.slice();
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

  const addWatchedFromHome = async (element: Movie, userRating: number) => {
    // element.sessionid = cookies.sessionid;
    element.user_rating = userRating;
    const response = await service.addWatchedFromHome(element);
    console.log("user movie list before", userMovielist);
    const newUserMovieList = response.movielist;
    setUserMovielist(newUserMovieList);
    const newUserWatched = response.movielist.filter(
      (movie: Movie) => movie.seen === false
    );

    console.log("user movie list after", newUserWatched);
    setWatchlistMovies(newUserWatched);
    const newUserGenreList = response.genres;
    setUserGenrelist(newUserGenreList);
    const newUserActorList = response.actors;
    setUserActorlist(newUserActorList);
    const newUserDirectorList = response.directors;
    setUserDirectorlist(newUserDirectorList);
    const newMovies = movies.slice(0, 200);
    for (const el of newMovies) {
      if (el.id === element.id) {
        el.seen = true;
        el.inWatchlist = false;
        el.user_rating = userRating;
        setMovies(newMovies);
      }
    }

    if (genres) {
      const newGenres = genres.slice();
      for (const el of newGenres) {
        if (el.movies.length > 0) {
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
      const newDirectors = directors.slice();
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
      const newActors = actors.slice();
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

  const deleteMovieFromHome = async (element: Movie) => {
    // element.sessionid = cookies.sessionid;
    let newUserMovieList;
    const response = await service.deleteMovieFromHome(element);
    const usermovielist = userMovielist.slice();
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
    const newUserWatchlist = newUserMovieList?.filter(
      (movie) => movie.seen === false
    ) as Array<Movie>;

    setWatchlistMovies(newUserWatchlist);
    const newMovies = movies.slice();
    for (const el of newMovies) {
      if (el.id === element.id) {
        el.seen = false;
        el.inWatchlist = false;
        el.user_rating = null;
        setMovies(newMovies);
      }
    }
    const newGenres = genres.slice();
    for (const el of newGenres) {
      if (el.movies.length > 0) {
        for (const e of el.movies) {
          if (e.id === element.id) {
            e.seen = false;
            e.inWatchlist = false;
            e.user_rating = null;
          }
        }
        setGenres(newGenres);
      }
    }
    const newDirectors = directors.slice();
    for (const el of newDirectors) {
      if (el.movies.length > 0) {
        for (const e of el.movies) {
          if (e.id === element.id) {
            e.seen = false;
            e.inWatchlist = false;
            e.user_rating = null;
          }
        }
        setDirectors(newDirectors);
      }
    }
    const newActors = actors.slice();
    for (const el of newActors) {
      if (el.movies.length > 0) {
        for (const e of el.movies) {
          if (e.id === element.id) {
            e.seen = false;
            e.inWatchlist = false;
            e.user_rating = null;
          }
        }
        setActors(newActors);
      }
    }
    const usergenrelist = userGenrelist.slice();
    const newUserGenreList = usergenrelist.filter(
      (genre) => genre.movid !== element.id
    );
    setUserGenrelist(newUserGenreList);
    const useractorlist = userActorlist.slice();
    const newUserActorList = useractorlist.filter(
      (actor) => actor.movid !== element.id
    );
    setUserActorlist(newUserActorList);
    const userdirectorlist = userDirectorlist.slice();
    const newUserDirectorList = userdirectorlist.filter(
      (director) => director.movid !== element.id
    );
    setUserDirectorlist(newUserDirectorList);
  };

  return (
    <MovieContext.Provider
      value={{
        actors,
        directors,
        genres,
        movies,
        userMovielist,
        userActorlist,
        userDirectorlist,
        userGenrelist,
        watchlistMovies,
        watchedMovies,
        deleteMovieFromHome,
        addWatchlistFromHome,
        setWatchlistMovies,
        addWatchedFromHome,
        setGenres,
        setMovies,
        setActors,
        setDirectors,
      }}
    >
      <div>
        {/* <authAPI.Provider value={{auth, setAuth}}> */}
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/watched" element={<Watched />} />
            <Route path="/collections" element={<Collections />} />
          </Routes>
        </Router>
        {/* </authAPI.Provider> */}
      </div>
    </MovieContext.Provider>
  );
}

export default App;
