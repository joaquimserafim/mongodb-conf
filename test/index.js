'use strict';

var tape = require('tape');
var parser = require('../index')();

function isJSObject(obj) {
  return obj === Object(obj) && !Array.isArray(obj);
}

var mongoConf = 'test/fixtures/mongod.conf';

tape('convert a `conf` file to JSON', function(assert) {
  function parseConfToJSON(err, json) {
    if (err) {
      assert.fail(err);
    } else {
      assert.deepEqual(isJSObject(json), true);
      assert.end();
    }
  }
  parser.toJSON(mongoConf, parseConfToJSON); 
});
