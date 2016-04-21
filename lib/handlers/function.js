'use strict';

exports.handle = function (rule, fn, option) {
  return option.compile(rule.raw, fn(option.data), option);
};
