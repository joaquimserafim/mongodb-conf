'use strict';

var fs    = require('fs');
var path  = require('path');
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
            cb(null, json);
          } else {
            cb(new Error('invalid JSON file!'));
          }
        } else {
          var lines = data.split(/\r?\n/).filter(function(line) {
            return !!line.indexOf('#') && line;
          });
          cb(null, lines);
        }
      }
    });
  }

  function conf2json(path, cb) {
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

    readFile(false, path, readFileConfCb);
  }

  function json2yaml(path, cb) {
    function readFileJSONCb(err, data) {
      if (err) {
        cb(err);
      } else {
        var yamlString = yaml.stringify(data, 4);
        cb(null, yamlString);
      }
    }

    readFile(true, path, readFileJSONCb);
  }

  return {
    conf2json: conf2json,
    json2yaml: json2yaml
  };
}
