import React, { useState, useContext } from 'react';
import { ModalProps } from '../PropTypes';
import './modal.css';
import { MovieContext } from '../App';
import ReactStars from 'react-stars';

function Modal(props: ModalProps) {
  const movieContext = useContext(MovieContext);

  const { show, closeModal } = props;

  const handleForm = async (new_rating: number) => {
    console.log(props.addWatch, new_rating);

    movieContext.addWatchedFromHome(props.addWatch, new_rating);
    closeModal();
  };

  return (
    <>
      <div className={show ? 'overlay' : 'hide'} onClick={closeModal} />
      <div className={show ? 'modal' : 'hide'}>
        <h1>What did you think of the movie?</h1>
        <p>Submit your rating below:</p>
        <button onClick={closeModal}>X</button>
        <ReactStars
          count={5}
          onChange={handleForm}
          size={32}
          color2={'#ffd700'}
        />
      </div>
    </>
  );
}

export default Modal;

/* 
<input
            className="modal-input"
            type="text"
            name="userRating"
            value={userRating}
            onChange={(event) => setUserRating(event.target.value)}
            placeholder="Enter your rating from 1 to 5..."
            required
          />
*/
