'use strict';

var hasOwn = require('has-own');

var placeholders = {};

function init(methods) {
  for (var name in methods) {
    if (hasOwn(name, methods)) {
      placeholders[name] = methods[name];
    }
  }
}

'step special'.split(' ').forEach(function (moduleName) {
  init(require('./' + moduleName));
});

module.exports = placeholders;
