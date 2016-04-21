'use strict';

function byCount(rule, val, helpers) {
  return helpers.bool(1, rule.count, val);
}

function byRange(rule, val, helpers) {

  var range = rule.isIRange()
    ? rule.getIRange()
    : rule.getDRange();

  return helpers.bool(range.min, range.max, val);
}


exports.handle = function (rule, val, option) {
  return rule.isBare() ? val
    : rule.isCount() ? byCount(rule, val, option.helpers)
    : rule.isRange() ? byRange(rule, val, option.helpers)
    : val;
};
