'use strict';

var tape    = require('tape');
var parser  = require('../index')();
var ut      = require('../ut');
var yaml    = require('yamljs');


tape('convert a `conf` file to JSON', function(assert) {
  function conf2jsonCb(err, json) {
    if (err) {
      assert.fail(err);
    } else {
      assert.deepEqual(ut.isJSObject(json), true);
      assert.end();
    }
  }
  parser.conf2json('test/fixtures/mongod.conf', conf2jsonCb);
});

tape('a bad `conf` file', function(assert) {
  function conf2jsonCb(err) {
    if (err) {
      assert.equal(err.message, 'ENOENT, open \'test/fixtures/mongod.con\'');
      assert.end();
    }
  }
  parser.conf2json('test/fixtures/mongod.con', conf2jsonCb);
});

tape('convert from JSON to YAML', function(assert) {
  function json2yamlCb(err, yamlString) {
    if (err) {
      assert.fail(err);
    } else {
      assert.deepEqual(typeof yamlString, 'string');
      assert.deepEqual(ut.isJSObject(yaml.parse(yamlString)), true);
      assert.end();
    }
  }
  parser.json2yaml('test/fixtures/mongodb_conf.json', json2yamlCb);
});

tape('a bad `JSON` file', function(assert) {
  function json2yamlCb(err) {
    if (err) {
      assert.equal(err.message, 'invalid JSON file!');
      assert.end();
    }
  }
  parser.json2yaml('test/fixtures/bad_json_file.json', json2yamlCb);
});
