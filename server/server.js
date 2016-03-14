const express = require('express');
const app = express();

require('./config/middleware')(app, express);

const port = 8080;

app.listen(port);


module.exports = app;
