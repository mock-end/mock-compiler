'use strict';

var hasOwn = require('has-own');
var Rule   = require('../rule');


function doCompile(host, key, val, option) {

  var rule    = new Rule(key);
  var path    = option.path;
  var compile = option.compile;

  // compile
  host[rule.key] = compile(rule, val, option);
  // fix path
  option.path = path;
}

function byBare(obj, option) {

  var ret = {};

  for (var key in obj) {
    if (hasOwn(key, obj)) {
      doCompile(ret, key, obj[key], option);
    }
  }

  return ret;
}

function byCount(count, obj, option) {

  // randomly pick some keys

  var ret  = {};
  var keys = option.helpers.pickKeys(obj, count);

  keys.forEach(function (key) {
    doCompile(ret, key, obj[key], option);
  });

  return ret;
}

function byRange(rule, obj, option) {

  var range = rule.isIRange()
    ? rule.getIRange()
    : rule.getDRange();

  var count = option.helpers.int(range.min, range.max);

  return byCount(count, obj, option);
}


exports.handle = function (rule, obj, option) {

  return rule.isBare() ? byBare(obj, option)
    : rule.isCount() ? byCount(rule.count, obj, option)
    : rule.isRange() ? byRange(rule, obj, option)
    : byBare(obj, option);
};



