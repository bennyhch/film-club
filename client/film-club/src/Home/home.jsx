import "../App.css";
import "./home.css";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Header from "../Header/header";
import service from "../service";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import image1 from "../images/btn-add.svg";
import image2 from "../images/btn-added.svg";
import Modal from "../Modal/modal";

function Home(props) {
  const [cookies, setCookie] = useCookies();

  const firstMovies = props.movies.slice(0, 99);
  const secondMovies = props.movies.slice(100, 199);

  const [addWatch, setAddWatch] = useState({});
  const [show, setShow] = useState(false);
  const openModal = (element) => {
    setAddWatch(element);
    setShow(true);
  };
  const closeModal = () => setShow(false);

  const watchlistToggle = (element) => {
    if (element.inWatchlist === true) {
      return (
        <img
          className="infinity-button"
          src={image2}
          onClick={() => props.deleteMovieFromHome(element)}
        />
      );
    } else {
      return (
        <img
          className="infinity-button"
          src={image1}
          onClick={() => props.addWatchlistFromHome(element)}
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
        />
      );
    } else {
      return (
        <img
          className="seen-button"
          src={image1}
          value={element}
          onClick={() => openModal(element)}
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

  return (
    <div className="App">
      <Header></Header>
      <div className="modal-container">
        {show ? (
          <Modal
            closeModal={closeModal}
            addWatchedFromHome={props.addWatchedFromHome}
            addWatch={addWatch}
            show={show}
          />
        ) : null}
      </div>
      <div className="infinity">
        <h3 className="infinity-title">To Infinity... and Beyond!</h3>
        <div className="movielist-container">
          <ul className="infinity-movies">
            {firstMovies.map((el, index) => (
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
        <div className="movielist-container">
          <ul className="infinity-movies">
            {secondMovies.map((el, index) => {
              return (
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
              );
            })}
          </ul>
        </div>
      </div>
      <div className="infinity">
        <h3 className="infinity-title">{props.genres[0].genreName}</h3>
        <div className="movielist-container">
          <ul className="infinity-movies">
            {props.genres[0].movies.map((e, index) => {
              return (
                <li key={index}>
                  <img
                    className="movie-image"
                    src={"https://image.tmdb.org/t/p/w300" + e.poster_path}
                    alt="Not found."
                  />
                  <p className="movie-title-text">{e.title}</p>
                  <p className="watchlist-text">Watchlist</p>
                  <p className="watched-text">Watched</p>
                  {watchlistToggle(e)}
                  {watchedToggle(e)}
                  {ratingToggle(e)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="infinity">
        <h3 className="infinity-title">{props.actors[0].actorName}</h3>
        <div className="movielist-container">
          <ul className="infinity-movies">
            {props.actors[0].movies.map((e, index) => {
              return (
                <li key={index}>
                  <img
                    className="movie-image"
                    src={"https://image.tmdb.org/t/p/w300" + e.poster_path}
                    alt="Not found."
                  />
                  <p className="movie-title-text">{e.title}</p>
                  <p className="watchlist-text">Watchlist</p>
                  <p className="watched-text">Watched</p>
                  {watchlistToggle(e)}
                  {watchedToggle(e)}
                  {ratingToggle(e)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="infinity">
        <h3 className="infinity-title">{props.directors[0].directorName}</h3>
        <div className="movielist-container">
          <ul className="infinity-movies">
            {props.actors[0].movies.map((e, index) => {
              return (
                <li key={index}>
                  <img
                    className="movie-image"
                    src={"https://image.tmdb.org/t/p/w300" + e.poster_path}
                    alt="Not found."
                  />
                  <p className="movie-title-text">{e.title}</p>
                  <p className="watchlist-text">Watchlist</p>
                  <p className="watched-text">Watched</p>
                  {watchlistToggle(e)}
                  {watchedToggle(e)}
                  {ratingToggle(e)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="infinity">
        <h3 className="infinity-title">{props.genres[1].genreName}</h3>
        <div className="movielist-container">
          <ul className="infinity-movies">
            {props.genres[1].movies.map((e, index) => {
              return (
                <li key={index}>
                  <img
                    className="movie-image"
                    src={"https://image.tmdb.org/t/p/w300" + e.poster_path}
                    alt="Not found."
                  />
                  <p className="movie-title-text">{e.title}</p>
                  <p className="watchlist-text">Watchlist</p>
                  <p className="watched-text">Watched</p>
                  {watchlistToggle(e)}
                  {watchedToggle(e)}
                  {ratingToggle(e)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
