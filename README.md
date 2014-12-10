# Koala

## Description

  Logger and Analyser

## Installation

  `[sudo] npm i --save koala`

## Example

  ```
  var koala = require('koala');
  var tracker = koala('example');

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

(Visit)[https://github.com/Linkzter/koala/blob/master/API.md]

## License

  ISC
