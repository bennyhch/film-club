'use strict';

const user = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const checkUser = async (userEmail, userPassword) => {
	try {
		const filter = await user.findOne({ email: userEmail })
		const match = await bcrypt.compare(userPassword, filter.password);
		if (match) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		console.error("login credentials not found");
		return false;
	}
};

const createUser = async (req, res) => {
	try {
		if (req.body.email && req.body.password) {
			const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
			const newUser = await user.create({
				email: req.body.email,
				password: hashPassword,
			});
			res.status(201);
			res.send(newUser);
		} else {
			console.error("parameter is missing");
			res.status(400);
			res.send("parameter is missing");
		}
	} catch (e) {
		if (e.code === 11000) {
			console.error("create new user is failing");
			res.status(500);
			res.send("try again - email already in use");
		} else {
			console.error("create new user is failing");
			res.status(500);
		}
	}
};

const loginUser = async (req, res) => {
	try {
		if (req.body.email && req.body.password) {
			const userEmail = req.body.email;
			const userPassword = req.body.password;
			console.log(userEmail, userPassword)
			const authenticate = await checkUser(userEmail, userPassword);
			console.log(authenticate, 'auth')
			if (authenticate) {
				const sessionid = req.session;
				console.log(req.session);
				sessionid.userid = req.body.email
				res.status(200);
				res.send({ email: userEmail, password: userPassword });
			} else {
				console.error("login credentials not found");
				res.status(401);
				res.send("login credentials not found");
			}
		} else {
			console.error("parameter is missing");
			res.status(400);
			res.send("parameter is missing");
		}
	} catch (e) {
		console.error("login is failing");
		res.status(500);
	}
};

const logoutUser = (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res
				.status(500)
				.send({ error, message: 'Could not log out, please try again' });
		} else {
			res.clearCookie('sessionid');
			res.status(200).send({ message: 'Logout successful' });
		}
	});
};

module.exports = { createUser, loginUser, logoutUser };