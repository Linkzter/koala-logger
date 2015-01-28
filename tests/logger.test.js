// file: tests/logger.test.js - created at 2014-12-09, 08:52
var should = require('should');
var logger = require('../modules/logger');
var remove = require('remove');

describe('logger', function () {
  var appName = 'test-case-' + Date.now();
  var actual = logger(appName);

  it('should be an instance of Logger', function () {
    actual.should.be.an.instanceOf(logger.Logger);    
  });

  it('should be setted the application name', function () {
    actual.applicationName.should.be.eql(appName);
  });

  it('should be log an entry', function (done) {
    var key = 'testCase';
    var value = {
      testing: 'sample ' + Date.now()
    };

    actual.add(key, value, function (err) {
      should.not.exist(err);
      done();
    });
  });

  it('should be list logs', function (done) {
    actual.list(function (err, result) {
      should.not.exist(err);
      result.should.have.lengthOf(1);
      done();
    });
  });

  after(function (done) {
    actual.db.end();
    done();
  });
});
