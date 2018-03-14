const fs = require('fs');
var https = require('https');
var http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').load();

const mongoDB = require('./config/mongo');
mongoDB(); 

const Authentication = require('./config/auth');
Authentication();

const app = express();
const users = require('./routes/users');

const {
  HTTP_SERVER_PORT,
  HTTPS_KEY_FILE_PATH,
  HTTPS_CERT_FILE_PATH,
  HTTPS_SERVER_PORT,
  HTTPS_ENABLED
} = process.env;

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

http.createServer(app).listen(HTTP_SERVER_PORT);
console.log(`Listening on ${HTTP_SERVER_PORT}`);

if (HTTPS_ENABLED.toLowerCase() === 'true') {
  if (HTTPS_KEY_FILE_PATH && HTTPS_CERT_FILE_PATH) {
    https.createServer({
      key: fs.readFileSync(HTTPS_KEY_FILE_PATH),
      cert: fs.readFileSync(HTTPS_CERT_FILE_PATH)
    }, app).listen(HTTPS_SERVER_PORT);
  } else {
    console.error('KEY FILE & CERT_FILE required for HTTPS_ENABLED');
  }
}