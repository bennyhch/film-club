import "../App.css";
import "./home.css";
import Header from "../Header/header";
import { useCookies } from "react-cookie";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const image1 = require("../images/btn-add.svg");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const image2 = require("../images/btn-added.svg");
import Modal from "../Modal/modal";
import { useState } from "react";
import { HomeProps } from "../PropTypes";
import Reel from "../Reel/Reel";

function Home(props: HomeProps) {
  const firstMovies: Array<Movie> = props.movies.slice(0, 99);
  const secondMovies: Array<Movie> = props.movies.slice(100, 199);

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
            addWatchedFromHome={props.addWatchedFromHome}
            addWatch={addWatch}
            show={show}
          />
        ) : null}
      </div>
    );
  };

  return (
    <div className="App">
      <Header></Header>
      {renderModal()}

      <div className="infinity">
        <h3 className="infinity-title">To Infinity... and Beyond!</h3>
        <Reel openModal={openModal} movies={firstMovies} />
        <Reel openModal={openModal} movies={secondMovies} />
      </div>
      {props.genres && (
        <div className="infinity">
          <h3 className="infinity-title">{props.genres[0].genreName}</h3>
          <Reel openModal={openModal} movies={props.genres[0].movies} />
        </div>
      )}

      {props.actors && (
        <div className="infinity">
          <h3 className="infinity-title">{props.actors[0].actorName}</h3>
          {props.actors[0] && (
            <Reel openModal={openModal} movies={props.actors[0].movies} />
          )}
        </div>
      )}

      {props.actors[1] && (
        <div className="infinity">
          <h3 className="infinity-title">{props.actors[1].actorName}</h3>
          {props.actors[1] && (
            <Reel openModal={openModal} movies={props.actors[1].movies} />
          )}
        </div>
      )}

      {props.directors && (
        <div className="infinity">
          <h3 className="infinity-title">{props.directors[0].directorName}</h3>
          <Reel openModal={openModal} movies={props.directors[0].movies} />
        </div>
      )}
      {props.genres[1] && (
        <div className="infinity">
          <h3 className="infinity-title">{props.genres[0].genreName}</h3>
          <Reel openModal={openModal} movies={props.genres[1].movies} />
        </div>
      )}
    </div>
  );
}

export default Home;
