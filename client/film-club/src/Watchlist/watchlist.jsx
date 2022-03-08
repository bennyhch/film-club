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

function Watchlist(props) {

	return (
		<div className="App">
			<Header></Header>
		</div>

		// onlogin button complete: <Link to="/home">
		//on register button: <link to="/register">
		//on register button complete: <Link to="/home">

		// 	<div className="Discover">
		// 		<h3 className="DiscoverTitle"> Discover</h3>
		// 		<div className="horizontal-scroll-wrapper">
		// 			<div>
		// 				<ul className="DiscoverMovies">
		// 					{props.movies.map(el =>
		// 						<li key={el.id} >
		// 							<span className="Movie-title">{el.title}</span>
		// 							<img src={"https://image.tmdb.org/t/p/w300" + el.poster_path} alt="Not found." />
		// 							{buttonToggle(el)}
		// 						</li>
		// 					)}
		// 				</ul>
		// 			</div>
		// 		</div>
		// 	</div>
	);
}

export default Watchlist;