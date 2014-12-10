// file: modules/server.js - created at 2014-12-10, 02:07
function serverHandler(logger) {
  // start here with server.js
  var express = require('express');
  var loggerServer = express();
  var loggerServerRoutes = require('./server-routes');
  var bodyParser = require('body-parser');

  // settings
  loggerServer.use(bodyParser.json());
  // routes
  loggerServer.use('/logs', loggerServerRoutes(logger));

  return loggerServer;
}
module.exports = exports = serverHandler;
