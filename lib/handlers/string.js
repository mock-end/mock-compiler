/* jshint evil: true */
'use strict';


function renderPlaceholder(template, option) {

  var isBare  = false;
  var result  = template;
  var rHolder = /(?:.)?@([a-zA-Z_][a-zA-Z0-9_]*)(\s*)(?:(\(.*\))(?!\)))?/g;

  template = template.replace(rHolder, function (input, methodName, spaces, argsString) {

    var isRaw       = input[0] === '\\';
    var placeholder = '@' + methodName;

    argsString = argsString
      ? renderPlaceholder(argsString, option)
      : '';

    if (isRaw) {
      return placeholder + spaces + argsString;
    } else {

      var prefix = input.substr(0, input.indexOf(placeholder));
      var suffix = '';
      var args   = argsString;

      // fix args
      if (argsString) {

        var matches = 1;

        for (var i = 1, l = argsString.length; i < l; i++) {

          var char = argsString[i];

          if (char === '(') {
            matches += 1;
          } else if (char === ')') {
            matches -= 1;
          }

          if (matches === 0) {
            args   = argsString.substr(0, i + 1);
            suffix = argsString.substr(i + 1);
            break;
          }
        }

        if (matches !== 0) {
          return input + 'ERROR: [bad args]';
        }
      }

      var exeResult = exePlaceholder(input, methodName, args, option);

      // fully matched, template is barely a placeholder, so return the
      // data(data-type) of the placeholder function called.
      if (template === input && !prefix && !suffix) {
        isBare = true;
        result = exeResult;
      }

      return prefix + exeResult + suffix;
    }
  });

  return isBare
    ? result
    : template;
}

function exePlaceholder(template, methodName, argsString, option) {

  var ret = template;

  try {

    if (!argsString) {
      argsString = '()';
    }

    var fnBody  = 'return ' + 'this.' + methodName + argsString + ';';
    var fn      = new Function(fnBody);
    var helpers = option.helpers;

    helpers.data = option.data;

    ret = fn.call(helpers);

    delete helpers.data;

  } catch (error) {
    ret += ' ERROR: [' + error + ']';
  }

  return ret;
}

function byCount(count, str, option) {

  var ret = '';

  if (str) {
    // repeat the template str by count
    while (count--) {
      ret += str;
    }
    ret = renderPlaceholder(ret, option);
  } else {
    // generate random str
    ret = count ? option.helpers.string(count) : str;
  }

  return ret;
}

function byRange(rule, str, option) {
  var range = rule.isIRange()
    ? rule.getIRange()
    : rule.getDRange();

  var count = option.helpers.int(range.min, range.max);

  return byCount(count, str, option);
}


exports.handle = function (rule, str, option) {

  return rule.isBare() ? byCount(1, str, option)
    : rule.isCount() ? byCount(rule.count, str, option)
    : rule.isRange() ? byRange(rule, str, option)
    : byCount(1, str, option);
};
