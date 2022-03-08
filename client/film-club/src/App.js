
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from "./images/film-club-logos_black.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from "./Login/login";
import Home from "./Home/home";
import Watched from './Watched/watched';
import Watchlist from './Watchlist/watchlist';
import Collections from './Collections/collections';
import { useCookies } from "react-cookie";
import { Component } from 'react';
import authAPI from './authAPI';



function App() {


  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() => (
          <Component />
        )}
      />
    )
  }
  const [cookies, setCookie] = useCookies();
  const [auth, setAuth] = React.useState(false)


  return (
    <div>
      {/* <authAPI.Provider value={{auth, setAuth}}> */}
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/watched" element={<Watched />} />
            <Route path="/collections" element={<Collections />} />
          </Routes>
        </Router>
      {/* </authAPI.Provider> */}
    </div>
  );
}

export default App;
