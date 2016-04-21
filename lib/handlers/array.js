'use strict';

var Rule = require('../rule');


function doCompile(host, key, val, option) {

  var rule    = new Rule(key);
  var path    = option.path;
  var compile = option.compile;

  // compile
  host[rule.key] = compile(rule, val, option);
  // fix path
  option.path = path;
}

function pickSome(count, arr, option) {

  arr = option.helpers.pickSome(arr, count);
  arr.forEach(function (item, index) {
    doCompile(arr, index, item, option);
  });
  return arr;
}

function repeat(times, arr, option) {

  var ret;

  if (times) {
    ret = [];
    while (times--) {
      ret = ret.concat(arr);
    }
  } else {
    ret = arr.slice();
  }


  ret.forEach(function (item, index) {
    doCompile(ret, index, item, option);
  });

  return ret;
}

function dispatch(count, negative, arr, option) {
  if (count > 0) {
    return repeat(count, arr, option);
  } else if (count < 0) {
    return pickSome(-count, arr, option);
  }

  if (!negative) { // +0  no repeat
    return repeat(0, arr, option);
  } else {         // -0  pick none items
    return [];
  }
}

function byBare(arr, options) {

  var ret = arr.slice();

  arr.forEach(function (item, index) {
    doCompile(ret, index, item, options);
  });

  return ret;
}

function byCount(rule, arr, option) {
  return dispatch(rule.count, rule.isNegative(), arr, option);
}

function byRange(rule, arr, option) {

  var range = rule.isIRange()
    ? rule.getIRange()
    : rule.getDRange();

  var count    = option.helpers.int(range.min, range.max);
  var negative = rule.isNegative();

  if (negative) {
    count = -count;
  }

  return dispatch(count, negative, arr, option);
}


exports.handle = function (rule, arr, option) {
  return rule.isBare() ? byBare(arr, option)
    : rule.isCount() ? byCount(rule, arr, option)
    : rule.isRange() ? byRange(rule, arr, option)
    : byBare(arr, option);
};
