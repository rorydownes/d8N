const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').load();
const mongoDB = require('./mongoDB');
mongoDB(); 

const users = require('./routes/users');

const app = express();
const { SERVER_PORT } = process.env;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', users);

app.use(function (req, res, next) {
  var err = new Error('Resource not found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    error: err.message
  });
});

app.listen(SERVER_PORT);
console.log(`Listening on ${SERVER_PORT}`);