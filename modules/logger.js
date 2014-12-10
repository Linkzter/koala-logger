// file: modules/logger.js - created at 2014-12-09, 08:52
var level = require('level');
var path = require('path');

/**
 * Logger based on register track of an application 
 * @contructor
 * @param applicationName {string} - Name of the application
 */
function Logger(applicationName) {
  // values
  this.applicationName = applicationName;
  this.dbName = this.applicationName + '-logs'; 
  this.db = level(path.resolve(process.cwd(), this.dbName));
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

  this
    .db
    .put(
      key,
      { value: value, created_at: Date.now() },
      { valueEncoding: 'json' },
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

  function dataHandler(data) {
    if (data.key.indexOf(this.applicationName)) {
      out.push(data.value);
    }
  }

  function errorHandler(err) {
    callback(err, null);
  }

  function outParseMapHandler(item) {
    return JSON.parse(item);
  }

  function outSortHandler(a, b) {
    return a.created_at < b.created_at;
  }

  function outValueMapHandler(item) {
    var content = {};
    content[item.key] = item.value;
    return item.value;
  }

  function endHandler() {
    out = out.map(outParseMapHandler);
    out = out.sort(outSortHandler);
    out = out.map(outValueMapHandler);

    callback(null, out);
  }

  this
    .db
    .createReadStream({ keys: true, values: true })
    .on('data', dataHandler)
    .on('error', errorHandler)
    .on('end', endHandler);
}

function loggerHandler(applicationName) {
  // start here with logger.js
  return new Logger(applicationName);
}
loggerHandler.Logger = Logger;

module.exports = exports = loggerHandler;
