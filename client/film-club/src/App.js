
import './App.css';
import logo from "./images/film_club-logo_black.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={{ logo }} alt="Film Club Logo" />
        <p>hello</p>
        {/* <Search searchVal={searchVal} searchMovies={searchMovies}></Search> */}
      </header>
    </div>
  );
}

export default App;
