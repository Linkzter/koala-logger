// file: modules/server-routes.js - created at 2014-12-10, 02:08
function serverRoutesHandler(logger) {
  var express = require('express');
  var router = express.Router();

  function logsHandler(req, res, next) {
    logger.list(function (err, result) {
      if (err) {
        next(err);
      } else {
        res.send(result);
      }
    });
  }
  router.get('/', logsHandler);

  return router;
}
module.exports = exports = serverRoutesHandler;
