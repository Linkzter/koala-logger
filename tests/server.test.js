// file: tests/server.test.js - created at 2014-12-10, 02:41
var should = require('should');
var superagent = require('superagent');
var koala = require('../');
var remove = require('remove');

describe('server', function () {
  var appName = 'test-case-' + Date.now();
  var logger = koala.logger(appName);
  var server = koala.server(logger);

  logger.add('testing', { some: 'test' });

  server.listen(4300);

  it('should be list logs', function (done) {
    function endHandler(err, res) {
      should.not.exist(err);
      res.body.length.should.be.above(0);
      done()
    }
    superagent
      .get('http://localhost:4300/logs')
      .end(endHandler);
  });

  after(function (done) {
    remove.removeSync(logger.dbName);
    done();
  });
});
