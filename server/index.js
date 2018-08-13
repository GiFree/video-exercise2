require('dotenv').config();
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const socketConfig = require('./socket.js');

const app = express();
const server = http.createServer(app);
const io = socketConfig(server);

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../dist')));

const routes = require('./routes');
app.use('/', routes);

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
    }
  });
});

module.exports = server;