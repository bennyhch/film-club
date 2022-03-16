'use strict';

import { Request, Response } from 'express';

import user from '../models/user';
import movielist from '../models/user_movielist';
import Moviecollection from '../models/user_collections';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const checkUser = async (userEmail: string, userPassword: string) => {
  try {
    const filter: UserInfo = (await user.findOne({
      email: userEmail,
    })) as UserInfo;
    const match = await bcrypt.compare(userPassword, filter.password);
    if (match) {
      return filter.email;
    } else {
      return false;
    }
  } catch (e) {
    console.error('login credentials not found');
    return false;
  }
};

export const createUser = async (req: Request, res: Response) => {
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
      const newMovieCollectionUser = await Moviecollection.create({
        email: req.body.email,
      });
      res.status(201);
      res.send({ newUser, newMovielistUser, newMovieCollectionUser });
    } else {
      console.error('parameter is missing');
      res.status(400);
      res.send('parameter is missing');
    }
  } catch (e: any) {
    if (e.code === 11000) {
      console.error('create new user is failing');
      res.status(500);
      res.send('try again - email already in use');
    } else {
      console.error('create new user is failing');
      res.status(500);
    }
  }
};

/* 
	Bug: Session is undefined at the moment.

*/
export const loginUser = async (req: Request, res: Response) => {
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
        console.error('login credentials not found');
        res.status(401);
        res.send('login credentials not found');
      }
    } else {
      console.error('parameter is missing');
      res.status(400);
      res.send('parameter is missing');
    }
  } catch (e) {
    console.error('login is failing');
    res.status(500);
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    // req.session.destroy()
    // res.clearCookie('sessionid');
    res.status(200);
    res.send('Logout successful');
  } catch (e) {
    console.error('logout is failing');
    res.status(500);
  }
};
