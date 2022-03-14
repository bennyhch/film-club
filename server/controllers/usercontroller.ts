"use strict";

import { ErrorRequestHandler, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const user = require("../models/user");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const movielist = require("../models/user_movielist");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcrypt");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moviecollection = require("../models/user_collections");
const saltRounds = 10;

const checkUser = async (userEmail: string, userPassword: string) => {
  try {
    const filter = await user.findOne({ email: userEmail });
    const match = await bcrypt.compare(userPassword, filter.password);
    if (match) {
      return filter.email;
    } else {
      return false;
    }
  } catch (e) {
    console.error("login credentials not found");
    return false;
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    if (req.body.email && req.body.password) {
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
      const newUser = await user.create({
        email: req.body.email,
        password: hashPassword,
      });
      const newMovielistUser = await movielist.create({
        email: req.body.email,
      });
      const newMovieCollectionUser = await moviecollection.create({
        email: req.body.email,
      });
      res.status(201);
      res.send({ newUser, newMovielistUser, newMovieCollectionUser });
    } else {
      console.error("parameter is missing");
      res.status(400);
      res.send("parameter is missing");
    }
  } catch (e: any) {
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

/* 
	Bug: Session is undefined at the moment.

*/
const loginUser = async (req: Request, res: Response) => {
  try {
    if (req.body.email && req.body.password) {
      const userEmail = req.body.email;
      const userPassword = req.body.password;
      const authenticate = await checkUser(userEmail, userPassword);
      if (authenticate) {
        // req.session.userEmail = authenticate
        // console.log(req.session)
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

const logoutUser = async (req: Request, res: Response) => {
  try {
    // req.session.destroy()
    // res.clearCookie('sessionid');
    res.status(200);
    res.send("Logout successful");
  } catch (e) {
    console.error("logout is failing");
    res.status(500);
  }
};

module.exports = { createUser, loginUser, logoutUser };
