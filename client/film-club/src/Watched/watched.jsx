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


function Watched(props) {

	const [cookies, setCookie] = useCookies();
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [actors, setActors] = useState([]);
	const [directors, setDirectors] = useState([]);

	useEffect(() => {
		service.getOnLoadWatched(cookies.sessionid)
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

	return (
		<div className="App">
			<Header></Header>
			{movies.length ?
				<p>got movies</p>
				:
				<div className="watched-page">
				  <div class-name="empty-watched-box">
					  <p>Call yourself a film fan? Mark movies as watched to see them appear on your watched list.</p>
					</div>
				</div>}
		</div>
	);
}

export default Watched;