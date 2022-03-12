import "../App.css";
import "./watchlist.css";
import Header from "../Header/header";
import service from "../service";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import image1 from "../images/btn-add.svg";
import image2 from "../images/btn-added.svg";
import Modal from "../Modal/modal";

function Watchlist(props) {
  const [cookies, setCookie] = useCookies();

  const [movieReels, setMovieReels] = useState();
  const [genreReels, setGenreReels] = useState();
  const [actorReels, setActorReels] = useState();
  const [directorReels, setDirectorReels] = useState();

  useEffect(() => {
    service
      .getOnLoadWatchlist(cookies.sessionid)
      .then((response) => {
        const genres = response.genreMovieLists;
        const directors = response.directorMovieLists;
        const actors = response.actorMovieLists;
        /* 
					Array of arrays coming from back end. First one will be watchlist. 
				*/
        props.setWatchlistMovies(response.watchlistMovieLists[0]);
        setGenreReels(genres);
        setActorReels(actors);
        setDirectorReels(directors);

        const movieReels = [];
        for (let i = 0; i < 200; i += 25) {
          movieReels.push(props.movies.slice(i, i + 24));
        }
        setMovieReels(movieReels);
      })
      .catch((error) => {
        console.log(error, "error occurred on load");
      });
  }, []);

  useEffect(() => {
    const movieReels = [];
    for (let i = 0; i < 200; i += 25) {
      movieReels.push(props.movies.slice(i, i + 24));
    }
    setMovieReels(movieReels);
  }, []);

  const watchlistToggle = (element) => {
    if (element.inWatchlist === true) {
      return (
        <img
          className="infinity-button"
          src={image2}
          onClick={() => props.deleteMovieFromHome(element)}
          alt="infinity"
        />
      );
    } else {
      return (
        <img
          className="infinity-button"
          src={image1}
          onClick={() => props.addWatchlistFromHome(element)}
          alt="infinity"
        />
      );
    }
  };

  const watchedToggle = (element) => {
    if (element.seen === true) {
      return (
        <img
          className="seen-button"
          src={image2}
          onClick={() => props.deleteMovieFromHome(element)}
          alt="infinity"
        />
      );
    } else {
      return (
        <img
          className="seen-button"
          src={image1}
          value={element}
          onClick={() => openModal(element)}
          alt="infinity"
        />
      );
    }
  };

  const ratingToggle = (element) => {
    if (element.seen === true) {
      return <p className="rating-text">Your rating: {element.user_rating}</p>;
    } else {
      return (
        <p className="rating-text">Public rating: {element.vote_average}</p>
      );
    }
  };

  const [addWatch, setAddWatch] = useState({});
  const [show, setShow] = useState(false);
  const openModal = (element) => {
    // remove from watched on this page.
    //
    setAddWatch(element);
    setShow(true);
  };
  const closeModal = () => setShow(false);

  return (
    <div className="App">
      <Header></Header>
      <div className="modal-container">
        {show ? (
          <Modal
            closeModal={closeModal}
            addWatch={addWatch}
            addWatchedFromHome={props.addWatchedFromHome}
            show={show}
          />
        ) : null}
      </div>
      {props.watchlistMovies ? (
        <div className="infinity">
          <h3 className="infinity-title">Your Want-To-Watch List:</h3>
          <div className="movielist-container">
            <ul className="infinity-movies">
              {props.watchlistMovies.map((el, index) => (
                <li key={index}>
                  <img
                    className="movie-image"
                    src={"https://image.tmdb.org/t/p/w300" + el.poster_path}
                    alt="Not found."
                  />
                  <p className="movie-title-text">{el.title}</p>
                  <p className="watchlist-text">Watchlist</p>
                  <p className="watched-text">Watched</p>
                  {watchlistToggle(el)}
                  {watchedToggle(el)}
                  {ratingToggle(el)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
      {genreReels &&
        genreReels.map((genre) => {
          return (
            <div className="infinity">
              <h3 className="infinity-title">Based on your Fave Genres</h3>
              <div className="movielist-container">
                <ul className="infinity-movies">
                  {genre.map((movie, index) => {
                    return (
                      <li key={index}>
                        <img
                          className="movie-image"
                          src={
                            "https://image.tmdb.org/t/p/w300" +
                            movie.poster_path
                          }
                          alt="Not found."
                        />
                        <p className="movie-title-text">{movie.title}</p>
                        <p className="watchlist-text">Watchlist</p>
                        <p className="watched-text">Watched</p>
                        {watchlistToggle(movie)}
                        {watchedToggle(movie)}
                        {ratingToggle(movie)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      {actorReels &&
        actorReels.map((list, index) => {
          return (
            <div className="infinity" key={index}>
              <h3 className="infinity-title">Based on your Fave Actors</h3>
              <div className="movielist-container">
                <ul className="infinity-movies">
                  {list.map((movie, ind) => {
                    return (
                      <li key={ind}>
                        <img
                          className="movie-image"
                          src={
                            "https://image.tmdb.org/t/p/w300" +
                            movie.poster_path
                          }
                          alt="Not found."
                        />
                        <p className="movie-title-text">{movie.title}</p>
                        <p className="watchlist-text">Watchlist</p>
                        <p className="watched-text">Watched</p>
                        {watchlistToggle(movie)}
                        {watchedToggle(movie)}
                        {ratingToggle(movie)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      {directorReels &&
        directorReels.map((list, index) => {
          return (
            <div className="infinity" key={index}>
              <h3 className="infinity-title">Based on your Fave Directors</h3>
              <div className="movielist-container">
                <ul className="infinity-movies">
                  {list.map((movie, ind) => {
                    return (
                      <li key={ind}>
                        <img
                          className="movie-image"
                          src={
                            "https://image.tmdb.org/t/p/w300" +
                            movie.poster_path
                          }
                          alt="Not found."
                        />
                        <p className="movie-title-text">{movie.title}</p>
                        <p className="watchlist-text">Watchlist</p>
                        <p className="watched-text">Watched</p>
                        {watchlistToggle(movie)}
                        {watchedToggle(movie)}
                        {ratingToggle(movie)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      <div className="infinity">
        <h3 className="infinity-title">
          Fill your watchlist with films you want to see. Here are a few you
          might like:
        </h3>
        {movieReels &&
          movieReels.map((reel, index) => {
            return (
              <div className="movielist-container" key={index}>
                <ul className="infinity-movies">
                  {reel.map((el, index) => (
                    <li key={index}>
                      <img
                        className="movie-image"
                        src={"https://image.tmdb.org/t/p/w300" + el.poster_path}
                        alt="Not found."
                      />
                      <p className="movie-title-text">{el.title}</p>
                      <p className="watchlist-text">Watchlist</p>
                      <p className="watched-text">Watched</p>
                      {watchlistToggle(el)}
                      {watchedToggle(el)}
                      {ratingToggle(el)}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Watchlist;
