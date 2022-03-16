'use strict';
import {Document, Model, model, Types, Query} from 'mongoose';
import mongoose from './index.js';
const Schema = mongoose.Schema;


//Typescript 
interface Userinfo  {
	_id?: string;
	email: string;
	password: string;
	_v?:number;
}

// Schema
const userSchema = new Schema <Userinfo> ({
	email: {
		type: String,
		required: [true, 'email is missing'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'password is missing'],
	},
});

const User = mongoose.model ('User', userSchema);


module.exports = User;