import "../App.css";
import "./login.css";
import {
	BrowserRouter as Router,
	Routes,
	Switch,
	Route,
	Link,
	NavLink,
	useNavigate
} from "react-router-dom";
import logo from "../images/film-club-logos_black.png";
import { useEffect, useState } from 'react';
import service from '../service';
import { useCookies } from "react-cookie";

function Login(props) {

	const [cookies, setCookie] = useCookies(['sessionid']);
  const navigate = useNavigate()
	const [newEmail, setNewEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');

	const handleRegister = async (event) => {
		event.preventDefault();
		await service.registerUser(registerEmail, registerPassword);
		setCookie('sessionid', registerEmail, { path: '/'})
		setRegisterEmail('');
		setRegisterPassword('');
		navigate('/home', { replace: true });
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		const response = await service.loginUser(newEmail, newPassword);
		setCookie('sessionid', newEmail, { path: '/' })
		setNewEmail('');
		setRegisterPassword('');
		navigate('/home', { replace: true })
	}

	return (
		<div className="App">
			<div className="login-page-container">
				<img className="openimage" src="https://www.wallpaperup.com/uploads/wallpapers/2015/12/12/858715/38ab8700ce1051a9b2311504d06f8289-700.jpg"></img>
				<div className="login-column-container">
					<img className="opener-logo" src={logo} alt="Film Club Logo" />
					<p className="login-head">THE HOME OF FILM FANS</p>
					<div className="login-body-text">
						<p >Discover new movies to fall in love with.</p>
						<p>Keep track of your favourite actors and directors.</p>
						<p>Connect with other film superfans.</p>
					</div>
					<div className="login-container">
					<form className="login-box" onSubmit={handleLogin}>
						<p>Sign In Here:</p>
						<input className='form-input' type='text' name='title' value={newEmail} onChange={(event) => setNewEmail(event.target.value)} placeholder='Enter your email...' required />
						<input className='form-input' type='password' name='title' value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder='Enter your password...' required />
						<div className="button-container">
						  <button className="login-button" type="submit">Sign In</button>
						</div>
						</form>
						<form className="login-box" onSubmit={handleRegister}>
							<p>Register Here:</p>
							<input className='form-input' type='text' name='title' value={registerEmail} onChange={(event) => setRegisterEmail(event.target.value)} placeholder='Enter your email...' required />
							<input className='form-input' type='password' name='title' value={registerPassword} onChange={(event) => setRegisterPassword(event.target.value)} placeholder='Enter your password...' required />
							<div className="button-container">
								<button className="login-button" type="submit">Register</button>
							</div>
						</form>
					</div>
				</div>
			</div>
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

export default Login;