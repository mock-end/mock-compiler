var expect = require('chai').expect;
var assert = require('chai').assert;

describe('handle boolean', function () {

  var compiler = require('../../../lib');

  it('by-bare', function () {

    var template = {
      'boolean1': true,
      'boolean2': false
    };

    var ret = compiler.compile(template);

    expect(ret.boolean1).to.be.equal(true);
    expect(ret.boolean2).to.be.equal(false);

  });

  it('by-count', function () {

    var count = 100;
    while (count--){
      var template = {
        'boolean1|0': true,
        'boolean2|1': false,
        'boolean3|-1': false,
      };

      var ret = compiler.compile(template);


      expect(ret.boolean1).to.be.equal(true);

      expect(ret.boolean2).to.be.a('boolean');

      expect(ret.boolean3).to.be.equal(false);
      expect(ret.boolean3).to.be.a('boolean');
    }
  });

  it('by-range', function () {

    var count = 100;
    while (count--){
      var template = {
        'boolean1|0-0': true,
        'boolean2|1-2': false,
        'boolean3|-1-2': false,
        'boolean4|.1-2': false,
        'boolean5|-.1-2': false,
        'boolean6|-.a-b': false,
      };

      var ret = compiler.compile(template);


      expect(ret.boolean1).to.be.equal(true);

      expect(ret.boolean2).to.be.a('boolean');
      expect(ret.boolean3).to.be.a('boolean');
      expect(ret.boolean4).to.be.a('boolean');
      expect(ret.boolean5).to.be.a('boolean');
      expect(ret.boolean6).to.be.equal(false);

    }

  });
});

