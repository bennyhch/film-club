import "../App.css";
import "./header.css";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require("../images/film-club-logos_black.png");

function Header() {
  return (
    <div>
      <header className="App-header">
        <NavLink to="/home" className="header-text">
          <h3>Home</h3>
        </NavLink>
        <NavLink to="/collections" className="header-text">
          <h3>Collections</h3>
        </NavLink>
        <NavLink to="/watched" className="header-text">
          <h3>Watched</h3>
        </NavLink>
        <NavLink to="/watchlist" className="header-text">
          <h3>Watchlist</h3>
        </NavLink>
        {/* <input className="search-bar" onChange={props.searchMovies} value={props.searchVal} placeholder="Search for movies" /> */}
        <NavLink to="/" className="header-text">
          <h6>Logout</h6>
        </NavLink>
        <img className="App-logo" src={logo} alt="Film Club Logo" />
        {/* <Search searchVal={searchVal} searchMovies={searchMovies}></Search> */}
      </header>
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

export default Header;
