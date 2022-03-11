import "../App.css";
import "./watchlist.css";
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

function Watchlist(props) {

	const [cookies, setCookie] = useCookies();

	// const [movies, setMovies] = useState([]);
	// const [genres, setGenres] = useState([]);
	// const [actors, setActors] = useState([]);
	// const [directors, setDirectors] = useState([]);

	useEffect(() => {
		service.getOnLoadWatchlist(cookies.sessionid)
			.then(response => {
				const genres = response.slice(1, 3);
				const directors = response.slice(3, 5);
				const actors = response.slice(5, 7);
				const user = response[0];
				// console.log('user from watchlist', user)

				// const userGenrelist = user.genres;
				// const userActorlist = user.actors;
				// const userDirectorlist = user.directors;
				props.setWatchlistMovies(user)
				props.setGenres(genres);
				props.setActors(actors);
				props.setDirectors(directors);
				// props.setUserMovielist();
				// props.setUserGenrelist(userGenrelist);
				// props.setUserActorlist(userActorlist);
				// props.setUserDirectorlist(userDirectorlist);
			})
			.catch(error => {
				console.log(error, 'error occurred on load')
			})
	}, [])

	const firstMovies = props.movies.slice(0, 24);
	// console.log(firstMovies, "firstMovies");
	const secondMovies = props.movies.slice(25, 49);
	const thirdMovies = props.movies.slice(50, 74);
	const fourthMovies = props.movies.slice(75, 99);
	const fifthMovies = props.movies.slice(100, 124);
	const sixthMovies = props.movies.slice(125, 149);
	const seventhMovies = props.movies.slice(150, 174);
	const eighthMovies = props.movies.slice(175, 199);
	const genres3 = props.genres.slice(3, 4);
	const genres4 = props.genres.slice(4, 5);
	const genres5 = props.genres.slice(5);
	const actors2 = props.actors.slice(2, 3);
	const actors3 = props.actors.slice(3);
	const directors2 = props.directors.slice(2, 3);
	const directors3 = props.directors.slice(3, 4);


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
			{props.watchlistMovies.length ?
				<div className="infinity">
					<h3 className="infinity-title">Your Want-To-Watch List:</h3>
					<div className="movielist-container">
						<ul className="infinity-movies">
							{props.watchlistMovies.map((el, index) =>
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
			{props.genres.length ?
				<div className="infinity">
					<h3 className="infinity-title">Based on your Fave Genres</h3>
					<div className="movielist-container">
						<ul className="infinity-movies">
							{genres5.map(el => {
								return el.map((e, index) => {
									return (
										<li key={index} >
											<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + e.poster_path} alt="Not found." /><p className="movie-title-text">{e.title}</p>
											<p className="watchlist-text">Watchlist</p>
											<p className="watched-text">Watched</p>
											{watchlistToggle(e)}
											{watchedToggle(e)}
											{ratingToggle(e)}
										</li>
									)
								})
							}
							)}
						</ul>
					</div>
				</div>
				:
				null}
			{props.actors.length ?
				<div className="infinity">
					<h3 className="infinity-title">Based on your Fave Actors</h3>
					<div className="movielist-container">
						<ul className="infinity-movies">
							{actors3.map(el => {
								return el.map((e, index) => {
									return (
										<li key={index} >
											<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + e.poster_path} alt="Not found." /><p className="movie-title-text">{e.title}</p>
											<p className="watchlist-text">Watchlist</p>
											<p className="watched-text">Watched</p>
											{watchlistToggle(e)}
											{watchedToggle(e)}
											{ratingToggle(e)}
										</li>
									)
								})
							}
							)}
						</ul>
					</div>
				</div>
				:
				null}
			{props.directors.length ?
				< div className="infinity">
			<h3 className="infinity-title">Based on your Fave Directors</h3>
			<div className="movielist-container">
				<ul className="infinity-movies">
					{directors3.map(el => {
						return el.map((e, index) => {
							return (
								<li key={index} >
									<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + e.poster_path} alt="Not found." /><p className="movie-title-text">{e.title}</p>
									<p className="watchlist-text">Watchlist</p>
									<p className="watched-text">Watched</p>
									{watchlistToggle(e)}
									{watchedToggle(e)}
									{ratingToggle(e)}
								</li>
							)
						})
					}
					)}
				</ul>
			</div>
		</div>
		:
	null}
			<div className="infinity">
				<h3 className="infinity-title">Fill your watchlist with films you want to see. Here are a few you might like:</h3>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{firstMovies.map((el, index) =>
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
				<div className="movielist-container">
					<ul className="infinity-movies">
						{secondMovies.map((el, index) =>
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
				<div className="movielist-container">
					<ul className="infinity-movies">
						{thirdMovies.map((el, index) =>
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
				<div className="movielist-container">
					<ul className="infinity-movies">
						{fourthMovies.map((el, index) =>
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
				<div className="movielist-container">
					<ul className="infinity-movies">
						{fifthMovies.map((el, index) =>
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
				<div className="movielist-container">
					<ul className="infinity-movies">
						{sixthMovies.map((el, index) =>
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
				<div className="movielist-container">
					<ul className="infinity-movies">
						{seventhMovies.map((el, index) =>
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
				<div className="movielist-container">
					<ul className="infinity-movies">
						{eighthMovies.map((el, index) =>
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
		</div>
	);
}

export default Watchlist;