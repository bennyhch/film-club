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
import logo from "../images/film-club-logos_black.png"
import Header from "../Header/header";


function Home(props) {

	return (
		
		<div className = "App">
		  <Header></Header>
		</div>

	);
}

export default Home;