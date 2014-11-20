'use strict';

var fs    = require('fs');
var path  = require('path');
var split = require('split');
var yaml  = require('yamljs');
var ut    = require('./ut');

module.exports = parser;

function parser() {
  function readConfFile(ext, filePath, cb) {
    if (ext !== path.extname(filePath)) {
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

  function confToJson(path, cb) {
    function readFileConfCb(err, data) {
      if (err) {
        cb(err);
      } else {
        var obj = {};
        data.forEach(function(e) {
          var s = e.split('=');
          obj[s[0]] = s[1];
        });
        cb(null, obj);
      }
    }

    readConfFile('.conf', path, readFileConfCb);
  }

  function jsonToYaml(path, cb) {
    function readFileJSONCb(err, data) {
      if (err) {
        cb(err);
      } else {
        var json = ut.parseJSON(data);
        var yamlString = yaml.stringify(json, 4);
        cb(null, yamlString);
      }
    }

    readConfFile('.json', path, readFileJSONCb);
  }

  return {
    toJSON: confToJson,
    jsonToYaml: jsonToYaml
  };
}
