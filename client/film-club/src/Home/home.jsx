import "../App.css";
import "./home.css";
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

function Home(props) {

	const [cookies, setCookie] = useCookies();
	// const [movies, setMovies] = useState([]);
	// const [genres, setGenres] = useState([]);
	// const [actors, setActors] = useState([]);
	// const [directors, setDirectors] = useState([]);

	// useEffect(() => {
	// 	service.getOnLoadHome(cookies.sessionid)
	// 		.then(response => {
	// 			const genres = response[200];
	// 	    const directors = response[201];
	// 	    const actors = response[202];
	// 			setMovies(response);
	// 			setGenres(genres);
	// 			console.log(genres[3].map(el => el.id))
	// 			setActors(actors);
	// 			setDirectors(directors);
	// 		})
	// 		.catch(error => {
	// 			console.log(error, 'error occurred on load')
	// 		})
	// }, [])


	const firstMovies = props.movies.slice(0, 99);
	const secondMovies = props.movies.slice(100, 199);
	const genres3 = props.genres.slice(3, 4);
	const genres4 = props.genres.slice(4, 5);
	const genres5 = props.genres.slice(5);
	const actors2 = props.actors.slice(2, 3);
	const actors3 = props.actors.slice(3);
	const directors2 = props.directors.slice(2, 3);
	const directors3 = props.directors.slice(3, 4);

	return (

		<div className = "App">
			<Header></Header>
			<div className="infinity">
				<h3 className="infinity-title">To Infinity... and Beyond!</h3>
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
						{secondMovies.map(el => {
							return (
								<li key={el.id} >
								<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
							</li>
								)
							}
						)}
					</ul>
				</div>
			</div>
			<div className="infinity">
				<h3 className="infinity-title">{props.genres[0]}</h3>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{genres3.map(el => {
							return el.map(e => {
								return (
									<li key={e.id} >
										<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + e.poster_path} alt="Not found." />
									</li>
								)
							})
						}
						)}
					</ul>
				</div>
			</div>
			<div className="infinity">
				<h3 className="infinity-title">{props.actors[0]}</h3>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{actors2.map(el => {
							return el.map(e => {
								return (
									<li key={e.id} >
										<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + e.poster_path} alt="Not found." />
									</li>
								)
							})
						}
						)}
					</ul>
				</div>
			</div>
			<div className="infinity">
				<h3 className="infinity-title">{props.directors[0]}</h3>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{directors2.map(el => {
							return el.map(e => {
								return (
									<li key={e.id} >
										<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + e.poster_path} alt="Not found." />
									</li>
								)
							})
						}
						)}
					</ul>
				</div>
			</div>
			<div className="infinity">
				<h3 className="infinity-title">{props.genres[1]}</h3>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{genres4.map(el => {
							return el.map(e => {
								return (
									<li key={e.id} >
										<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + e.poster_path} alt="Not found." />
									</li>
								)
							})
						}
						)}
					</ul>
				</div>
			</div>
			<div className="infinity">
				<h3 className="infinity-title">{props.actors[1]}</h3>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{actors3.map(el => {
							return el.map(e => {
								return (
									<li key={e.id} >
										<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + e.poster_path} alt="Not found." />
									</li>
								)
							})
						}
						)}
					</ul>
				</div>
			</div>
			<div className="infinity">
				<h3 className="infinity-title">{props.directors[1]}</h3>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{directors3.map(el => {
							return el.map(e => {
								return (
									<li key={e.id} >
										<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + e.poster_path} alt="Not found." />
									</li>
								)
							})
						}
						)}
					</ul>
				</div>
			</div>
			<div className="infinity">
				<h3 className="infinity-title">{props.genres[2]}</h3>
				<div className="movielist-container">
					<ul className="infinity-movies">
						{genres5.map(el => {
							return el.map(e => {
								return (
									<li key={e.id} >
										<img className="movie-image" src={"https://image.tmdb.org/t/p/w300" + e.poster_path} alt="Not found." />
									</li>
								)
							})
						}
						)}
					</ul>
				</div>
			</div>
		</div>


	);
}

export default Home;