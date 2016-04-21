'use strict';

var toString = require('to-str');

var MAX_SAFE_INTEGER = 9007199254740991;

var rStep   = /^[\+\-]((\d+\.?\d*?)|(\.\d+))$/;
var rNumber = /^((\d+\.?\d*?)|(\.\d+))$/;
var rPart   = /^([\+-])?(\d*-?\d*)(?:\.(\d*-?\d*))?$/;
var rRange  = /^(\d*)-?(\d*)$/;
var cache   = {};


function Rule(rule, force) {

  if (rule instanceof Rule) {
    return rule;
  }

  // normalize
  rule = toString(rule) || '';

  // cache for speed up
  var cached = cache[rule];
  if (cached && !force) {
    return cached;
  }

  var idx  = rule.indexOf('|');
  var key  = idx > 0 ? rule.substr(0, idx) : rule;
  var tail = idx && rule.substr(idx + 1);

  tail = tail.trim();

  this.raw = rule;
  this.key = key;

  this.step     = false;
  this.count    = false;
  this.iMin     = false;
  this.iMax     = false;
  this.dMin     = false;
  this.dMax     = false;
  this.negative = false;
  this.decimal  = false;


  if (tail) {

    this.negative = tail[0] === '-';

    if (rStep.test(tail)) {
      this.step = this.count = parseFloat(tail);
    } else if (rNumber.test(tail)) {
      this.count = parseFloat(tail);
    }

    if (this.count === false) {
      var matches = tail.match(rPart);
      if (matches) {
        this.negative = matches[1] === '-';
        this.decimal  = matches[3] !== undefined;

        if (matches[2]) {
          var iRange = matches[2].match(rRange);
          this.iMin  = !!iRange[1] && parseInt(iRange[1], 10);
          this.iMax  = !!iRange[2] && parseInt(iRange[2], 10);
        }

        if (matches[3]) {
          var dRange = matches[3].match(rRange);
          this.dMin  = !!dRange[1] && parseInt(dRange[1], 10);
          this.dMax  = !!dRange[2] && parseInt(dRange[2], 10);
        }
      }
    }
  }

  cache[rule] = this;
}

Rule.prototype.isBare = function () {
  return this.key === this.raw;
};

Rule.prototype.isStep = function () {
  return this.step !== false;
};

Rule.prototype.isCount = function () {
  return this.count !== false;
};

Rule.prototype.isIRange = function () {
  return this.iMin !== false || this.iMax !== false;
};

Rule.prototype.isDRange = function () {
  return this.dMin !== false || this.dMax !== false;
};

Rule.prototype.isRange = function () {
  return this.isIRange() || this.isDRange();
};

Rule.prototype.getRange = function (isDecimal) {

  var min;
  var max;

  if (isDecimal) {
    min = this.dMin === false ? 0 : this.dMin;
    max = this.dMax === false ? MAX_SAFE_INTEGER : this.dMax;
  } else {
    min = this.iMin === false ? 0 : this.iMin;
    max = this.iMax === false ? MAX_SAFE_INTEGER : this.iMax;
  }

  return {
    min: Math.min(min, max),
    max: Math.max(min, max)
  };
};

Rule.prototype.getIRange = function () {
  return this.getRange(false);
};

Rule.prototype.getDRange = function () {
  return this.getRange(true);
};

Rule.prototype.isNegative = function () {
  return this.negative === true;
};

Rule.prototype.isDecimal = function () {
  return this.decimal === true;
};


module.exports = Rule;
