'use strict';

require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('connected');
	})
	.catch((e) => {
		console.log('error connecting', e)
	});

module.exports = mongoose;