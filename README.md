# mock-compiler

> Compile template to mock date.

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/mock-end/mock-compiler/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/mock-end/mock-compiler/master.svg?style=flat-square)](https://travis-ci.org/mock-end/mock-compiler)
[![coverage:?](https://img.shields.io/coveralls/mock-end/mock-compiler/master.svg?style=flat-square)](https://coveralls.io/github/mock-end/mock-compiler)


## Install

```
$ npm install --save mock-compiler
```

## Usage

```js
var compiler = require('mock-compiler');

var template = {
    'number|1-10': 1,
    'bool|1-10'  : true,
    'string|2'   : 'foobar',
    'array|-2'   : [1, 2, 3, 4, 5],
    'object|2'   : { a: 1, b: 2, c: 3, d: 4 }
    'function'   : function () { return 'mock' },
    'placeholder': '@int(1, 10)'
};

var result = compiler.compile(template);
// => 
// {
//   number: 6,
//   bool  : false,
//   string: 'foobarfoobar',
//   array : [3, 5],
//   object: { b: 2, c: 3 }
//   function   : 'mock',
//   placeholder: 3
// }
```


## API


### compile(template[, data, helpers])

Compile the given `template` into random result, with optional `data` and `helpers`.
 
- `template` - Data template with [special syntax].
- `data` - Optional data that can be used in placeholders.
- `helpers` - Optional runtime placeholders, which are only available in this compiling.


### registerPlaceholder(name, fn[, overwrite])

Register custom placeholders to the compiler, these placeholders are shared in all compiling:

```js
// register single placeholder
compiler.registerPlaceholder('getData', function(key) {
    var data = this.data || {};
    return data[key];
});

// register placeholders
compiler.registerPlaceholder({
    add: function (a) {
        return this.data.seed + a;
    },
    sub: function (a) {
        return this.data.seed - a;
    },
    rand: function () {
        // use the internal placeholders
        return this.int(1, 10);
    }
});
```

Use the placeholders:

```js
var template = {
    aaa: '@getData("foo")',
    bbb: '@add(2)',
    ccc: '@sub(2)',
    ddd: '@rand()',
    eee: '@rand', // brackets can be omitted when these is no any argument.
    fff: '@add(@sub(2))',   // nested placeholders
    ggg: '@test("Runtime")' // use runtime placeholder
};
var result = compiler.compile(template, { foo: 'mock loves you!!', seed: 10 }, {
    // runtime placeholder
    test: function (name) {
        return name + ' is cool.'
    }
});
// =>
//{
//    aaa: 'mock loves you!!'
//    bbb: 12
//    ccc: 8
//    ddd: 6
//    eee: 9
//    fff: 18
//    ggg: 'Runtime is cool.'
//}

```

## Template Syntax


## Internal Placeholders


## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/mock-end/mock-compiler/issues/new).
