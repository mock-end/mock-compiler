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



## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/mock-end/mock-compiler/issues/new).
