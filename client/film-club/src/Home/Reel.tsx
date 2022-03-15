import React, { useContext } from "react";
import { MovieContext } from "../App";
import { ReelProps } from "../PropTypes";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const image1 = require("../images/btn-add.svg");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const image2 = require("../images/btn-added.svg");

// Reel just needs relevant movies, openModal,

function Reel(props: ReelProps) {
  const movieContext = useContext(MovieContext);

  const watchlistToggle = (element: Movie) => {
    if (element.inWatchlist === true) {
      return (
        <img
          className="infinity-button"
          src={image2}
          onClick={() => movieContext.deleteMovieFromHome(element)}
        />
      );
    } else {
      return (
        <img
          className="infinity-button"
          src={image1}
          onClick={() => movieContext.addWatchlistFromHome(element)}
        />
      );
    }
  };

  const watchedToggle = (element: Movie) => {
    if (element.seen === true) {
      return (
        <img
          className="seen-button"
          src={image2}
          onClick={() => movieContext.deleteMovieFromHome(element)}
        />
      );
    } else {
      return (
        <img
          className="seen-button"
          src={image1}
          onClick={() => props.openModal(element)}
        />
      );
    }
  };

  const ratingToggle = (element: Movie) => {
    if (element.seen === true) {
      return <p className="rating-text">Your rating: {element.user_rating}</p>;
    } else {
      return (
        <p className="rating-text">Public rating: {element.vote_average}</p>
      );
    }
  };
  return (
    <div className="movielist-container">
      <ul className="infinity-movies">
        {props.movies.map((el, index) => (
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
}

export default Reel;
