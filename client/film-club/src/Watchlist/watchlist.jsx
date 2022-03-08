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

function Watchlist(props) {

	const [cookies, setCookie] = useCookies();
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [actors, setActors] = useState([]);
	const [directors, setDirectors] = useState([]);

	useEffect(() => {
		service.getOnLoadWatchlist(cookies.sessionid)
			.then(response => {
				const genres = response[200];
		    const directors = response[201];
		    const actors = response[202];
				setMovies(response);
				setGenres(genres);
				console.log(genres[3].map(el => el.id))
				setActors(actors);
				setDirectors(directors);
			})
			.catch(error => {
				console.log(error, 'error occurred on load')
			})
	}, [])

	const firstMovies = movies.slice(0, 24);
	const secondMovies = movies.slice(25, 49);
	const thirdMovies = movies.slice(50, 74);
	const fourthMovies = movies.slice(75, 99);
	const fifthMovies = movies.slice(100, 124);
	const sixthMovies = movies.slice(125, 149);
	const seventhMovies = movies.slice(150, 174);
	const eighthMovies = movies.slice(175, 199);

	return (

		<div className="App">
			<Header></Header>
			<div className="infinity">
				<h3 className="infinity-title">Fill your watchlist with films you want to see. Here are a few you might like:</h3>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{firstMovies.map(el =>
							<li key={el.id} >
								<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
							</li>
						)}
					</ul>
				</div>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{secondMovies.map(el =>
							<li key={el.id} >
								<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
							</li>
						)}
					</ul>
				</div>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{thirdMovies.map(el =>
							<li key={el.id} >
								<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
							</li>
						)}
					</ul>
				</div>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{fourthMovies.map(el =>
							<li key={el.id} >
								<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
							</li>
						)}
					</ul>
				</div>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{fifthMovies.map(el =>
							<li key={el.id} >
								<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
							</li>
						)}
					</ul>
				</div>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{sixthMovies.map(el =>
							<li key={el.id} >
								<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
							</li>
						)}
					</ul>
				</div>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{seventhMovies.map(el =>
							<li key={el.id} >
								<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
							</li>
						)}
					</ul>
				</div>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{eighthMovies.map(el =>
							<li key={el.id} >
								<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
							</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Watchlist;