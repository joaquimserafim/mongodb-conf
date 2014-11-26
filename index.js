'use strict';

var fs    = require('fs');
var yaml  = require('yamljs');
var ut    = require('./ut');

module.exports = parser;

function parser() {
  function readFile(isJson, file, cb) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        cb(err);
      } else {
        if (isJson) {
          var json = ut.parseJSON(data);
          if (json) {
            cb(undefined, json);
          } else {
            cb(new Error('invalid JSON file!'));
          }
        } else {
          var lines = data.split(/\r?\n/).filter(function(line) {
            return !!line.indexOf('#') && line;
          });
          cb(undefined, lines);
        }
      }
    });
  }

  function conf2json(file, cb) {
    function readFileConfCb(err, data) {
      if (err) {
        cb(err);
      } else {
        var obj = {};
        data.forEach(function(e) {
          var s = e.split('=');
          obj[s[0]] = s[1];
        });
        cb(undefined, obj);
      }
    }

    readFile(false, file, readFileConfCb);
  }

  function json2yaml(file, cb) {
    function readFileJSONCb(err, data) {
      if (err) {
        cb(err);
      } else {
        var yamlString = yaml.stringify(data, 4);
        cb(undefined, yamlString);
      }
    }

    readFile(true, file, readFileJSONCb);
  }

  function yaml2json(file, cb) {
    yaml.load(file, function(obj) {
      if (obj) {
        cb(undefined, obj);
      } else {
        cb(new Error('Invalid YAML file or file doesn\'t exist!'));
      }
    });
  }

  return {
    conf2json: conf2json,
    json2yaml: json2yaml,
    yaml2json: yaml2json
  };
}
