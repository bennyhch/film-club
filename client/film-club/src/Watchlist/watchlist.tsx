import "../App.css";
import "./watchlist.css";
import service from "../service";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const image1 = require("../images/btn-add.svg") as string;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const image2 = require("../images/btn-added.svg") as string;

import Modal from "../Modal/modal";
import { MovieContext } from "../App";
import Reel from "../Reel/Reel";

function Watchlist() {
  const [cookies, setCookie] = useCookies();

  const movieContext = useContext(MovieContext);

  const [movieReels, setMovieReels] = useState<Array<Movie[]>>();
  const [genreReels, setGenreReels] = useState<Array<Movie[]>>();
  const [actorReels, setActorReels] = useState<Array<Movie[]>>();
  const [directorReels, setDirectorReels] = useState<Array<Movie[]>>();

  useEffect(() => {
    service
      .getOnLoadWatchlist(cookies.sessionid)
      .then((response) => {
        const genres = response.genreMovieLists;
        const directors = response.directorMovieLists;
        const actors = response.actorMovieLists;

        movieContext.setWatchlistMovies(response.watchlistMovieLists[0]);
        setGenreReels(genres);
        setActorReels(actors);
        setDirectorReels(directors);

        const movieReels = [];
        for (let i = 0; i < 200; i += 25) {
          movieReels.push(movieContext.movies.slice(i, i + 24));
        }
        setMovieReels(movieReels);
      })
      .catch((error) => {
        console.log(error, "error occurred on load");
      });
  }, []);

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
            addWatch={addWatch}
            addWatchedFromHome={movieContext.addWatchedFromHome}
            show={show}
          />
        ) : null}
      </div>
    );
  };

  return (
    <div className="App">
      {renderModal()}

      {movieContext.watchlistMovies && (
        <div className="infinity">
          <h3 className="infinity-title">Your Want-To-Watch List:</h3>
          <Reel openModal={openModal} movies={movieContext.watchlistMovies} />
        </div>
      )}

      <h3 className="infinity-title">Based on your Fave Genres</h3>
      {genreReels &&
        genreReels.map((genre) => {
          return (
            <div className="infinity">
              <Reel openModal={openModal} movies={genre} />
            </div>
          );
        })}

      <h3 className="infinity-title">Based on your Fave Actors</h3>
      {actorReels &&
        actorReels.map((list, index) => {
          return (
            <div className="infinity" key={index}>
              <Reel openModal={openModal} movies={list} />
            </div>
          );
        })}

      <h3 className="infinity-title">Based on your Fave Directors</h3>
      {directorReels &&
        directorReels.map((list, index) => {
          return (
            <div className="infinity" key={index}>
              <Reel openModal={openModal} movies={list} />
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
            return <Reel openModal={openModal} movies={reel} key={index} />;
          })}
      </div>
    </div>
  );
}

export default Watchlist;
