'use strict';

function isFloat(n) {
  return n % 1 !== 0;
}

function getPrecision(float) {
  return ((float + '').split('.')[1]).length;
}

var cache = {};

exports.step = function (seed, step, path) {

  var lastVal = cache[path];

  if (lastVal === undefined) {
    cache[path] = seed;
    return seed;
  }

  var ret = lastVal + step;

  var precision1 = isFloat(seed) ? getPrecision(seed) : 0;
  var precision2 = isFloat(step) ? getPrecision(step) : 0;
  var precision  = Math.max(precision1, precision2);

  ret = precision ? ret.toFixed(precision) : ret;
  ret = +ret;

  cache[path] = ret;

  return ret;
};
