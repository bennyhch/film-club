'use strict';

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/filmclubdb', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('connected');
	})
	.catch((e) => {
		console.log('error connecting', e)
	});

module.exports = mongoose;