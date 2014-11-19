'use strict';

var tape = require('tape');
var parser = require('../index')();

function isJSObject(obj) {
  return obj === Object(obj) && !Array.isArray(obj);
}

tape('convert a `conf` file to JSON', function(assert) {
  function parseConfToJSON(err, json) {
    if (err) {
      assert.fail(err);
    } else {
      assert.deepEqual(isJSObject(json), true);
      assert.end();
    }
  }
  parser.toJSON('test/fixtures/mongod.conf', parseConfToJSON);
});

tape('try to convert a bad `conf` file', function(assert) {
  function parseConfToJSON(err, json) {
    if (err) {
      assert.equal(err.message, 'mongod.conf with wrong extension!');
      assert.end();
    } else {
      // never should enter in here
      assert.fail(json);
    }
  }
  parser.toJSON('test/fixtures/mongod.cof', parseConfToJSON);
});
