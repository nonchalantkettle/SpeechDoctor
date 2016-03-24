const express = require('express');
const mongoose = require('mongoose');

const app = express();

// mongoose.connect('mongodb://localhost/speechdoctor');

require('./config/middleware')(app, express);

const port = 8080;

app.listen(port);

console.log('Listening on port ', port);

module.exports = app;
