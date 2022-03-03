'use strict';

const express = require('express');
const app = express()
const port = 3000; // could replace this with "const PORT = process.env.PORT || 3001" and then set up a .env file
const router = require('./router')
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
	try {
		res.send('server is connected')
	} catch {
		res.status(404)
		res.send('failed to connect')
	}
});

app.listen(port, () => {
	console.log(`listening on port ${port}`)
})