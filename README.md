# mock-compiler

> Compile template to mock date.

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/mock-end/mock-compiler/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/mock-end/mock-compiler/master.svg?style=flat-square)](https://travis-ci.org/mock-end/mock-compiler)
[![coverage:?](https://img.shields.io/coveralls/mock-end/mock-compiler/master.svg?style=flat-square)](https://coveralls.io/github/mock-end/mock-compiler)

## Table of Content

- [Install](#install)
- [Usage](#usage)
- [API](#api)
  - [compile(template[, data, helpers])](#compiletemplate-data-helpers)
  - [registerPlaceholder(name, fn[, overwrite])](#registerplaceholdername-fn-overwrite)
- [Template Syntax](#template-syntax)
  - [Rules for Number](#rules-for-number)
  - [Rules for Boolean](#rules-for-boolean)
  - [Rules for Array](#rules-for-array)
  - [Rules for Object](#rules-for-object)
  - [Rules for Function](#rules-for-function)
  - [Rules for String](#rules-for-string)
- [Placeholders](#placeholders)
- [Contributing](#contributing)

## Install

```
$ npm install --save mock-compiler
```

## Usage

```js
var compiler = require('mock-compiler');

var template = {
    raw : 'Mock loves you',
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
//   raw : 'Mock loves you',
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
 
- `template` - Data template with [special syntax](#template-syntax).
- `data` - Optional data that can be used in [placeholders](#Placeholders).
- `helpers` - Optional runtime placeholders, which are only available in this compiling.


### registerPlaceholder(name, fn[, overwrite])

Register custom placeholders to the compiler, these placeholders are shared in all compiling:

```js
// register single placeholder
compiler.registerPlaceholder('getData', function(key) {
    return this.data[key];
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
    eee: '@rand', // brackets can be omitted when do not take any arguments.
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

Every key-value in the template can be composed of three parts: 

```js
'name|rule': value
```

- `key` - name of the key.
- `rule` - optional, `key` and `rule` should be separated by `|`.
- `value` - indicate the value, value type or initial value.

Rules are closely related with the type of `value`. Now, let's go through rules with a variety of value types:


### Rules for Number

#### `name|[+-]step: seed`

Base on `seed`, increase/decrease by `step` on every compiling:

```js
{
    'num1|+1'  : 1,
    'num2|-1'  : 1,
    'num3|+1.5': 3
}
```

#### `name|number: value`

Randomly generate a number between `0` and `number`, `value` indicate whether the result is an **Integer** or **Float** and it's precision:

```js
{
    'num1|99' : 1,    // => 23
    'num2|99' : 1.23, // => 57.82
    'num2|-99': 1     // => -73
}
```

#### `name|min-max: value`

#### `name|min-max.min-max: value`


### Rules for Boolean

### Rules for Array

### Rules for Object

### Rules for Function

### Rules for String


## Placeholders

### Internal Placeholders

### About `this`

### Nested Usage

## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/mock-end/mock-compiler/issues/new).
