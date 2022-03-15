import "../App.css";
import "./watched.css";
import Header from "../Header/header";
import service from "../service";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const image1 = require("../images/btn-add.svg");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const image2 = require("../images/btn-added.svg");
import Modal from "../Modal/modal";
import { WatchedProps } from "../PropTypes";
import Reel from "../Reel/Reel";
import { MovieContext } from "../App";

function Watched() {
  const movieContext = useContext(MovieContext);

  const [cookies, setCookie] = useCookies();
  const [fiveMovies, setFiveMovies] = useState<Array<Movie>>([]);
  const [fourMovies, setFourMovies] = useState<Array<Movie>>([]);
  const [threeMovies, setThreeMovies] = useState<Array<Movie>>([]);
  const [twoMovies, setTwoMovies] = useState<Array<Movie>>([]);
  const [oneMovies, setOneMovies] = useState<Array<Movie>>([]);

  useEffect(() => {
    service
      .getOnLoadWatched(cookies.sessionid)
      .then((response) => {
        console.log(response);
        const genres = response.slice(1, 3);
        const directors = response.slice(3, 5);
        const actors = response.slice(5, 7);
        const user = response[0];
        const fiveMovies = user.filter(
          (movie: Movie) => movie.user_rating === 5
        );
        setFiveMovies(fiveMovies);
        const fourMovies = user.filter(
          (movie: Movie) => movie.user_rating === 4
        );
        setFourMovies(fourMovies);
        const threeMovies = user.filter(
          (movie: Movie) => movie.user_rating === 3
        );
        setThreeMovies(threeMovies);
        const twoMovies = user.filter(
          (movie: Movie) => movie.user_rating === 2
        );
        setTwoMovies(twoMovies);
        const oneMovies = user.filter(
          (movie: Movie) => movie.user_rating === 1
        );
        setOneMovies(oneMovies);
        movieContext.setWatchlistMovies(user);
        movieContext.setGenres(genres);
        movieContext.setActors(actors);
        movieContext.setDirectors(directors);
      })
      .catch((error) => {
        console.log(error, "error occurred on load");
      });
  }, []);

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
          onClick={() => openModal(element)}
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

  const [addWatch, setAddWatch] = useState<Movie>({} as Movie);
  const [show, setShow] = useState(false);
  const openModal = (element: Movie) => {
    setAddWatch(element);
    setShow(true);
  };
  const closeModal = () => setShow(false);

  const renderModal = () => {
    return (
      <div className="modal-container">
        {show ? (
          <Modal
            closeModal={closeModal}
            addWatchedFromHome={movieContext.addWatchedFromHome}
            addWatch={addWatch}
            show={show}
          />
        ) : null}
      </div>
    );
  };

  return movieContext.watchedMovies.length > 0 ? (
    <div className="App">
      {renderModal()}
      <div className="infinity">
        <h3 className="infinity-title">Your 5 Star Films:</h3>
        {fiveMovies && <Reel movies={fiveMovies} openModal={openModal} />}
      </div>
      <div className="infinity">
        <h3 className="infinity-title">Your 4 Star Films:</h3>
        {fourMovies && <Reel movies={fourMovies} openModal={openModal} />}
      </div>
      <div className="infinity">
        <h3 className="infinity-title">Your 3 Star Films:</h3>
        {threeMovies && <Reel movies={threeMovies} openModal={openModal} />}
      </div>
      <div className="infinity">
        <h3 className="infinity-title">Your 2 Star Films:</h3>
        {twoMovies && <Reel movies={twoMovies} openModal={openModal} />}
      </div>
      <div className="infinity">
        <h3 className="infinity-title">Your 1 Star Films:</h3>
        {oneMovies && <Reel movies={oneMovies} openModal={openModal} />}
      </div>
    </div>
  ) : (
    <div className="watched-page">
      <div class-name="empty-watched-box">
        <p>
          Call yourself a film fan? Mark movies as watched to see them appear on
          your watched list.
        </p>
      </div>
    </div>
  );
}

export default Watched;

/* 

        <div className="watched-page">
          <div class-name="empty-watched-box">
            <p>
              Call yourself a film fan? Mark movies as watched to see them
              appear on your watched list.
            </p>
          </div>
        </div>
*/
