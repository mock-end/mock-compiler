'use strict';

var fs         = require('fs');
var path       = require('path');
var yaml       = require('js-yaml');
var isArray    = require('is-array');
var isObject   = require('is-object');
var isAbsolute = require('is-absolute');

function readfile(filePath) {

  if (!isAbsolute(filePath)) {
    filePath = path.resolve(process.cwd(), filePath);
  }

  // check for existence first
  var stat = fs.statSync(filePath);

  if (!stat || !stat.isFile()) {
    throw new Error(filePath + ' is not a file');
  }

  var ext = path.extname(filePath);

  // YAML file
  if (ext.match(/ya?ml/)) {
    var res = fs.readFileSync(filePath, 'utf8');
    return yaml.safeLoad(res);
  }

  // JS / JSON / CoffeeScript
  if (ext.match(/json|js|coffee|ls/)) {
    if (require.cache[filePath]) {
      delete require.cache[filePath];
    }
    return require(filePath);
  }

  // unknown
  throw new Error(filePath + ' is an unsupported filetype');
}


exports.fromData = function (keys) {

  var data = this.data || {};
  var result;

  if (typeof keys === 'string') {
    result = data[keys];
  } else if (isArray(keys)) {
    result = {};
    for (var i = 0, l = keys.length; i < l; i++) {
      result[keys[i]] = data[keys[i]];
    }
  } else if (isObject(keys)) {
    result = {};
    for (var key in keys) {
      result[key] = data[key];
    }
  } else {
    result = keys;
  }

  return result;
};

exports.fromFile = function (filePath) {
  try {
    if (filePath) {
      return readfile(filePath);
    } else {
      return 'no file path specified.';
    }
  } catch (error) {
    return error + '';
  }
};
