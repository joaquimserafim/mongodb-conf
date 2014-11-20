'use strict';

var tape    = require('tape');
var parser  = require('../index')();
var ut      = require('../ut');


tape('convert a `conf` file to JSON', function(assert) {
  function parseConfToJson(err, json) {
    if (err) {
      assert.fail(err);
    } else {
      assert.deepEqual(ut.isJSObject(json), true);
      assert.end();
    }
  }
  parser.toJSON('test/fixtures/mongod.conf', parseConfToJson);
});

tape('try to convert a bad `conf` file', function(assert) {
  function parseConfToJson(err, json) {
    if (err) {
      assert.equal(err.message, 'mongod.conf with wrong extension!');
      assert.end();
    } else {
      // never should enter in here
      assert.fail(json);
    }
  }
  parser.toJSON('test/fixtures/mongod.cof', parseConfToJson);
});

tape('convert from JSON to YAML', function(assert) {
  function parseJsonToYaml(err, yaml) {
    if (err) {
      assert.fail(err);
    } else {
      assert.pass(yaml);
      assert.end();
    }
  }
  parser.jsonToYaml('test/fixtures/mongodb_conf.json', parseJsonToYaml);
});
