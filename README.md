# Koala

## Description

  Logger and Analyser

## Installation

  `[sudo] npm i --save koala-logger`

## Example

  ```
  var koala = require('koala-logger');
  var tracker = koala.logger('example');

  tracker
    .add('application-error', {
      some: 'data'
    }, function (err) {
      if (err) { console.log(err); }
    });
  ```

  after the insertion

  ```
  tracker
    .list(function (err, result) {
      if (err) { console.log(err); }
      console.log(result);
    });
  ```

### Express module
  
  ```
  var koala = require('koala-tracker');
  var logger = koala.logger('example');
  var server = koala.server(logger);
  ```

  running on express app

  ```
  app.use(server);
  ```

  or just run the server

  ```
  server.listen(4000);
  ```

## API

[Visit](https://github.com/Linkzter/koala/blob/master/API.md)

## License

  ISC
