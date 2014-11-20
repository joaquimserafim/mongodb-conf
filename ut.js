'use strict';

var ut = module.exports;

ut.isJSObject = function isJSObject(obj) {
  return obj === Object(obj) && !Array.isArray(obj);
};

ut.parseJSON = function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch(ex) {
    return null;
  }
};
