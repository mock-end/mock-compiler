'use strict';

var assign     = require('object-assign');
var hasOwn     = require('has-own');
var isObject   = require('is-object');
var isFunction = require('is-function');
var randoms    = require('random-utility');
var compiler   = require('./compiler');
var presets    = require('./presets');

var placeholders = {};

function register(host, name, fn, overwrite) {
  if (isFunction(fn) && !hasOwn(name, host) || overwrite === true) {
    host[name]               = fn;
    host[name.toUpperCase()] = fn;
    host[name.toLowerCase()] = fn;
  }
}

function registerPlaceholder(name, fn, overwrite) {

  if (isObject(name)) {
    overwrite = fn === true;
    for (var key in name) {
      register(placeholders, key, name[key], overwrite);
    }
  } else {
    register(placeholders, name, fn, overwrite);
  }
};

registerPlaceholder(randoms);
registerPlaceholder(presets);

function insensitive(obj) {
  var result = {};
  if (isObject(obj)) {
    for (var key in obj) {
      register(result, key, obj[key], true);
    }
  }
  return result;
}


exports.registerPlaceholder = registerPlaceholder;

exports.compile = function (template, data, helpers) {

  if (!isObject(template)) {
    return template;
  }

  var key    = '';
  var option = {
    data: data,
    path: '/',
    helpers: assign({}, placeholders, insensitive(helpers))
  };

  return compiler.compile(key, template, option);
};

