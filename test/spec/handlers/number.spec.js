var expect = require('chai').expect;

describe('handle number', function () {

  var compiler = require('../../../lib');

  it('by-bare', function () {
    var template = {
      'key1': 1,
      'key2|': 1,
      'key3|asd': 1
    };

    var ret = compiler.compile(template);

    expect(ret.key1).to.equal(1);
    expect(ret.key2).to.equal(1);
    expect(ret.key3).to.equal(1);
  });

  it('by-step', function () {

    var template = {
      'key0|+1': 1,
      'key1|-1': 1,
      'key2|+.2': 1,
      'key3|-0.2': 1
    };

    var ret = compiler.compile(template);

    expect(ret.key0).to.equal(1);
    expect(ret.key1).to.equal(1);
    expect(ret.key2).to.equal(1);
    expect(ret.key3).to.equal(1);

    ret = compiler.compile(template);
    expect(ret.key0).to.equal(2);
    expect(ret.key1).to.equal(0);
    expect(ret.key2).to.equal(1.2);
    expect(ret.key3).to.equal(0.8);

    ret = compiler.compile(template);
    expect(ret.key0).to.equal(3);
    expect(ret.key1).to.equal(-1);
    expect(ret.key2).to.equal(1.4);
    expect(ret.key3).to.equal(0.6);
  });

  it('by-count', function () {

    var count = 100;

    while (count--) {
      var template = {
        'key1|10': 1,
        'key2|100': 1.,
        'key3|100': 1.23,
      };

      var ret = compiler.compile(template, null);

      expect(ret.key1).to.be.within(0, 10);
      expect(ret.key2).to.be.within(0, 100);

      expect(ret.key3)
        .to.be.a('number')
        .to.be.within(0, 100)
        .and
        .to.match(/^\d{1,2}(\.\d{0,2})?$/);
    }
  });

  it('by-range', function () {

    var count = 100;

    while (count--) {
      var template = {
        'key1|1-100': 1,
        'key2|1-100': 1.23,
        'key3|1-100.1-100': 1.23,
        'key4|-1-100.1-100': 1.23,
      };

      var ret = compiler.compile(template, null);

      expect(ret.key1).to.be.within(1, 100);
      expect(ret.key2).to.be.within(1, 100);

      expect(ret.key3)
        .to.be.within(1, 101)
        .and
        .to.match(/^\d{1,3}(\.\d{0,2})?$/);

      expect(ret.key4)
        .to.be.within(-101, -1)
        .and
        .to.match(/^-\d{1,3}(\.\d{0,2})?$/);
    }
  });

});
