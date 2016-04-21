'use strict';

var Rule = require('./rule');

var handlers = {
  'array': require('./handlers/array'),
  'object': require('./handlers/object'),
  'number': require('./handlers/number'),
  'string': require('./handlers/string'),
  'boolean': require('./handlers/boolean'),
  'function': require('./handlers/function')
};

function getType(obj) {
  if (obj === null || obj === undefined) {
    return '';
  } else {
    return Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase();
  }
}


exports.compile = function compile(key, val, option) {

  var type    = getType(val);
  var handler = handlers[type];

  if (!handler) {
    return val;
  }

  var rules = new Rule(key);

  // function should be called, then recompile
  if (key && type !== 'function') {
    var escaped = rules.key.replace(/\//g, '\uFFFC');
    option.path = option.path + '/' + escaped;
  }

  option.compile = compile;

  //console.log(val);
  //console.log(type);
  //console.log(option.path);
  //console.log(key);
  //console.log(rules);
  //console.log(option);

  return handler.handle(rules, val, option);
};
