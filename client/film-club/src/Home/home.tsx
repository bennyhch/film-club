import "../App.css";
import "./home.css";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const image1 = require("../images/btn-add.svg");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const image2 = require("../images/btn-added.svg");
import Modal from "../Modal/modal";
import { useContext, useState } from "react";
import Reel from "../Reel/Reel";
import { MovieContext } from "../App";

function Home() {
  const movieContext = useContext(MovieContext);

  const firstMovies: Array<Movie> = movieContext.movies.slice(0, 99);
  const secondMovies: Array<Movie> = movieContext.movies.slice(100, 199);

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
          <Modal show={show} closeModal={closeModal} addWatch={addWatch} />
        ) : null}
      </div>
    );
  };

  return (
    <div className="App">
      {renderModal()}

      <div className="infinity">
        <h3 className="infinity-title">To Infinity... and Beyond!</h3>
        <Reel openModal={openModal} movies={firstMovies} />
        <Reel openModal={openModal} movies={secondMovies} />
      </div>
      {movieContext.genres && (
        <div className="infinity">
          <h3 className="infinity-title">{movieContext.genres[0].genreName}</h3>
          <Reel openModal={openModal} movies={movieContext.genres[0].movies} />
        </div>
      )}

      {movieContext.actors && (
        <div className="infinity">
          <h3 className="infinity-title">{movieContext.actors[0].actorName}</h3>
          {movieContext.actors[0] && (
            <Reel
              openModal={openModal}
              movies={movieContext.actors[0].movies}
            />
          )}
        </div>
      )}

      {movieContext.actors[1] && (
        <div className="infinity">
          <h3 className="infinity-title">{movieContext.actors[1].actorName}</h3>
          {movieContext.actors[1] && (
            <Reel
              openModal={openModal}
              movies={movieContext.actors[1].movies}
            />
          )}
        </div>
      )}

      {movieContext.directors && (
        <div className="infinity">
          <h3 className="infinity-title">
            {movieContext.directors[0].directorName}
          </h3>
          <Reel
            openModal={openModal}
            movies={movieContext.directors[0].movies}
          />
        </div>
      )}
      {movieContext.genres[1] && (
        <div className="infinity">
          <h3 className="infinity-title">{movieContext.genres[1].genreName}</h3>
          <Reel openModal={openModal} movies={movieContext.genres[1].movies} />
        </div>
      )}
    </div>
  );
}

export default Home;
