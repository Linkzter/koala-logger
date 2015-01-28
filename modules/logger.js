// file: modules/logger.js - created at 2014-12-09, 08:52
var redis = require('redis');

/**
 * Logger based on register track of an application 
 * @contructor
 * @param applicationName {string} - Name of the application
 */
function Logger(applicationName) {
  // values
  this.applicationName = applicationName;
  this.dbName = this.applicationName + '-logs'; 
  this.db = redis.createClient();
  // methods
  this.add = add;
  this.list = list;
}

/**
 * Add new log entry
 * @method add
 * @param key {string} - Set key of log
 * @param value {object} - Set content to the application
 * @callback Logger~callback 
 */
function add(key, value, callback) {
  key = this.applicationName + '-' + key + '-' + Date.now();
  callback = callback || function () {};
  var input = {};

  input[key] = JSON.stringify(value);

  this
    .db
    .hmset(
      this.dbName,
      input,
      callback
    );

  return this;
}

/**
 * List logs
 * @method list
 * @callback Logger~callback 
 */
function list(callback) {
  var out = [];

  function listHandler(err, obj) {
    if (err) {
      callback(err, null);
    } else {
      for (var key in obj) {
        var item = JSON.parse(obj[key]);
        out.push(item); 
      }
      callback(err, out);
    }
  }

  this
    .db
    .hgetall(this.dbName, listHandler);
}

function loggerHandler(applicationName) {
  // start here with logger.js
  return new Logger(applicationName);
}
loggerHandler.Logger = Logger;

module.exports = exports = loggerHandler;
