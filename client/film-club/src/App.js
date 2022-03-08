
import './App.css';
import logo from "./images/film-club-logos_black.png";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./Login/login";
import Home from "./Home/home";
import Watched from './Watched/watched';
import Watchlist from './Watchlist/watchlist';
import Collections from './Collections/collections';


function App() {


  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/watched" element={<Watched />} />
        <Route path="/collections" element={<Collections />} />
      </Routes>
    </Router>
  );
}

export default App;
