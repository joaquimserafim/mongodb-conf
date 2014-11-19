'use strict';

var fs    = require('fs');
var path  = require('path');
var split = require('split');
//var debug = require('debug');
//var yaml  = require('yamljs');

module.exports = parser;

function parser() {
  function readConfFile(filePath, cb) {
    if ('.conf' !== path.extname(filePath)) {
      cb(new Error('mongod.conf with wrong extension!'));
    } else {
      var data = [];
      fs.createReadStream(path.join(__dirname, filePath))
        .pipe(split())
        .on('data', function(line) {
          if (0 !== line.indexOf('#') && line) {
            data.push(line);
          }
        })
        .on('error', cb)
        .on('end', function() {
          cb(null, data);
        });
    }
  }

  function confToJSON(path, cb) {
    function toJSON(data) {
      var obj = {};
      data.forEach(function(e) {
        var s = e.split('=');
        obj[s[0]] = s[1];
      });

      cb(null, obj);
    }

    function readFileCb(err, data) {
      if (err) {
        cb(err);
      } else {
        toJSON(data);
      }
    }

    readConfFile(path, readFileCb);
  }

  return {
    toJSON: confToJSON
  };
}
