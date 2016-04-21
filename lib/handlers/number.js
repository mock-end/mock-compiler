'use strict';


function isFloat(n) {
  return n % 1 !== 0;
}

function getPrecision(float) {
  return ((float + '').split('.')[1]).length;
}

function byStep(step, val, option) {
  return option.helpers.step(val, step, option.path);
}

function byCount(count, val, helpers) {
  if (isFloat(val)) {

    var random    = Math.random() * count;
    var precision = getPrecision(val);

    return +(random.toFixed(precision));
  } else {
    return helpers.int(0, count);
  }
}

function byRange(rule, val, helpers) {

  var ret;
  var iRange  = rule.getIRange();
  var iRandom = helpers.int(iRange.min, iRange.max);

  if (rule.isDecimal()) {

    var dRange  = rule.getDRange();
    var dRandom = helpers.int(dRange.min, dRange.max);

    ret = +(iRandom + '.' + dRandom);
  } else {
    ret = iRandom;
  }

  if (isFloat(val)) {
    var precision = getPrecision(val);

    ret = ret.toFixed(precision);
  }


  return rule.isNegative() ? -ret : +ret;
}


exports.handle = function (rule, val, option) {

  return rule.isBare() ? val
    : rule.isStep() ? byStep(rule.step, val, option)
    : rule.isCount() ? byCount(rule.count, val, option.helpers)
    : rule.isRange() ? byRange(rule, val, option.helpers)
    : val;
};



