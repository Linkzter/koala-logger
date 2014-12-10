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

## API

[Visit](https://github.com/Linkzter/koala/blob/master/API.md)

## License

  ISC
