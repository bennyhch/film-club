import "../App.css";
import "./watched.css";
import {
	BrowserRouter as Router,
	Routes,
	Switch,
	Route,
	Link,
	NavLink
} from "react-router-dom";
import Header from "../Header/header";
import service from "../service";
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import image1 from '../images/btn-add.svg';
import image2 from '../images/btn-added.svg';
import Modal from "../Modal/modal";

function Watched(props) {

	const [cookies, setCookie] = useCookies();
	const [fiveMovies, setFiveMovies] = useState([]);
	const [fourMovies, setFourMovies] = useState([]);
	const [threeMovies, setThreeMovies] = useState([]);
	const [twoMovies, setTwoMovies] = useState([]);
	const [oneMovies, setOneMovies] = useState([]);


	useEffect(() => {
		service.getOnLoadWatched(cookies.sessionid)
			.then(response => {
				console.log(response)
				const genres = response.slice(1, 3);
				const directors = response.slice(3, 5);
				const actors = response.slice(5, 7);
				const user = response[0];
				const fiveMovies = user.filter(movie => movie.user_rating === 5);
				setFiveMovies(fiveMovies);
				const fourMovies = user.filter(movie => movie.user_rating === 4);
				setFourMovies(fourMovies);
				const threeMovies = user.filter(movie => movie.user_rating === 3);
				setThreeMovies(threeMovies);
				const twoMovies = user.filter(movie => movie.user_rating === 2);
				setTwoMovies(twoMovies);
				const oneMovies = user.filter(movie => movie.user_rating === 1);
				setOneMovies(oneMovies);
				props.setWatchlistMovies(user)
				props.setGenres(genres);
				props.setActors(actors);
				props.setDirectors(directors);
			})
			.catch(error => {
				console.log(error, 'error occurred on load')
			})
	}, [])

	const watchlistToggle = (element) => {
		if (element.inWatchlist === true) {
			return <img className="infinity-button" src={image2} onClick={() => props.deleteMovieFromHome(element)} />

		} else {
			return <img className="infinity-button" src={image1} onClick={() => props.addWatchlistFromHome(element)} />
		}
	};

	const watchedToggle = (element) => {
		if (element.seen === true) {
			return <img className="seen-button" src={image2} onClick={() => props.deleteMovieFromHome(element)} />

		} else {
			return <img className="seen-button" src={image1} value={element} onClick={() => openModal(element)} />
		}
	};

	const ratingToggle = (element) => {
		if (element.seen === true) {
			return <p className="rating-text">Your rating: {element.user_rating}</p>
		} else {
			return <p className="rating-text">Public rating: {element.vote_average}</p>
		}
	};

	const [addWatch, setAddWatch] = useState({})
	const [show, setShow] = useState(false);
	const openModal = (element) => {
		setAddWatch(element)
		setShow(true);
	}
	const closeModal = () => setShow(false);

	return (
		<div className="App">
			<Header></Header>
			<div className='modal-container'>
				{show ? <Modal closeModal={closeModal} addWatchedFromHome={props.addWatchedFromHome} addWatch={addWatch}
					show={show} /> : null}
			</div>
			{props.watchedMovies.length ?
				<div className="infinity">
					<h3 className="infinity-title">Your 5 Star Films:</h3>
					<div className="movielist-container">
						<ul className="infinity-movies">
							{fiveMovies.map((el, index) =>
								<li key={index} >
									<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
									<p className="movie-title-text">{el.title}</p>
									<p className="watchlist-text">Watchlist</p>
									<p className="watched-text">Watched</p>
									{watchlistToggle(el)}
									{watchedToggle(el)}
									{ratingToggle(el)}
								</li>
							)}
						</ul>
					</div>
				</div>
				:
				<div className="watched-page">
				  <div class-name="empty-watched-box">
					  <p>Call yourself a film fan? Mark movies as watched to see them appear on your watched list.</p>
					</div>
				</div>}
			{props.watchedMovies.length ?
				<div className="infinity">
					<h3 className="infinity-title">Your 4 Star Films:</h3>
					<div className="movielist-container">
						<ul className="infinity-movies">
							{fourMovies.map((el, index) =>
								<li key={index} >
									<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
									<p className="movie-title-text">{el.title}</p>
									<p className="watchlist-text">Watchlist</p>
									<p className="watched-text">Watched</p>
									{watchlistToggle(el)}
									{watchedToggle(el)}
									{ratingToggle(el)}
								</li>
							)}
						</ul>
					</div>
				</div>
				:
				null}
			{props.watchedMovies.length ?
				<div className="infinity">
					<h3 className="infinity-title">Your 3 Star Films:</h3>
					<div className="movielist-container">
						<ul className="infinity-movies">
							{threeMovies.map((el, index) =>
								<li key={index} >
									<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
									<p className="movie-title-text">{el.title}</p>
									<p className="watchlist-text">Watchlist</p>
									<p className="watched-text">Watched</p>
									{watchlistToggle(el)}
									{watchedToggle(el)}
									{ratingToggle(el)}
								</li>
							)}
						</ul>
					</div>
				</div>
				:
				null}
			{props.watchedMovies.length ?
				<div className="infinity">
					<h3 className="infinity-title">Your 2 Star Films:</h3>
					<div className="movielist-container">
						<ul className="infinity-movies">
							{twoMovies.map((el, index) =>
								<li key={index} >
									<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
									<p className="movie-title-text">{el.title}</p>
									<p className="watchlist-text">Watchlist</p>
									<p className="watched-text">Watched</p>
									{watchlistToggle(el)}
									{watchedToggle(el)}
									{ratingToggle(el)}
								</li>
							)}
						</ul>
					</div>
				</div>
				:
				null}
			{props.watchedMovies.length ?
				<div className="infinity">
					<h3 className="infinity-title">Your 1 Star Films:</h3>
					<div className="movielist-container">
						<ul className="infinity-movies">
							{oneMovies.map((el, index) =>
								<li key={index} >
									<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
									<p className="movie-title-text">{el.title}</p>
									<p className="watchlist-text">Watchlist</p>
									<p className="watched-text">Watched</p>
									{watchlistToggle(el)}
									{watchedToggle(el)}
									{ratingToggle(el)}
								</li>
							)}
						</ul>
					</div>
				</div>
				:
				null}
		</div>
	);
}

export default Watched;