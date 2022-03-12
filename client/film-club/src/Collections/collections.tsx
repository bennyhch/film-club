import "../App.css";
import "./collections.css";
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

function Collections(props) {

	const [cookies, setCookie] = useCookies();
	const [collections, setCollections] = useState([]);
	const [people, setPeople] = useState([]);

	useEffect(() => {
		service.getOnLoadCollections(cookies.sessionid)
			.then(response => {
				const people = response[0];
				const collections = response[1];
				setCollections(collections);
				setPeople(people);
			})
			.catch(error => {
				console.log(error, 'error occurred on load')
			})
	}, [])


	return (
		<div className="App">
			<Header></Header>
			<div className="collections-bar">
				<h3>Actor Collection:</h3>
				<input className="search-bar" onChange={props.searchMovies} value={props.searchVal} placeholder="Search for your fave actor..." />
				<h3>Director Collection:</h3>
				<input className="search-bar" onChange={props.searchMovies} value={props.searchVal} placeholder="Search for your fave director..." />
			</div>
			{collections.length ?
				<p>got movies</p>
				:
				<div className="watched-page">
					<div class-name="empty-watched-box">
						<p>Call yourself a film fan? Search for your favourite actors or directors to import their complete output, then win trophies by watching everything they’ve ever done!</p>
					</div>
				</div>}
		</div>
	);
}

export default Collections;