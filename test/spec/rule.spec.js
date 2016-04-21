var expect = require('chai').expect;


describe('Rule', function () {

  var Rule = require('../../lib/rule');

  it('Rule("")', function () {

    var raw  = '';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: '',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key")', function () {

    var raw  = 'key';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|")', function () {

    var raw  = 'key|';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key| ")', function () {

    var raw  = 'key| ';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|abc")', function () {

    var raw  = 'key|abc';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|1")', function () {

    var raw  = 'key|1';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: 1,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }

    var MAX_SAFE_INTEGER = 9007199254740991;

    expect(rule.isBare()).to.be.equal(false);
    expect(rule.isStep()).to.be.equal(false);
    expect(rule.isCount()).to.be.equal(true);
    expect(rule.isIRange()).to.be.equal(false);
    expect(rule.isDRange()).to.be.equal(false);
    expect(rule.isNegative()).to.be.equal(false);
    expect(rule.isDecimal()).to.be.equal(false);
    expect(rule.isRange()).to.be.equal(false);
    expect(rule.getIRange()).to.be.eql({ min: 0, max: MAX_SAFE_INTEGER });
    expect(rule.getDRange()).to.be.eql({ min: 0, max: MAX_SAFE_INTEGER });

  });

  it('Rule("key|1") with cache', function () {

    var raw  = 'key|1';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: 1,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|1", true) force', function () {

    var raw  = 'key|1';
    var rule = new Rule(raw, true);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: 1,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule(rule)', function () {

    var raw   = 'key|1-99.2-88';
    var rule0 = new Rule(raw);
    var rule  = new Rule(rule0);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: 99,
      dMin: 2,
      dMax: 88,
      negative: false,
      decimal: true
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }

    expect(rule.getIRange()).to.be.eql({ min: 1, max: 99 });
    expect(rule.getDRange()).to.be.eql({ min: 2, max: 88 });
  });

  it('Rule("key|0")', function () {

    var raw  = 'key|0';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: 0,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|+0")', function () {

    var raw  = 'key|+0';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: 0,
      count: 0,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|-0")', function () {

    var raw  = 'key|-0';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: 0,
      count: 0,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: true,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|-1")', function () {

    var raw  = 'key|-1';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: -1,
      count: -1,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: true,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|+1")', function () {

    var raw  = 'key|+1';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: 1,
      count: 1,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|-1")', function () {

    var raw  = 'key|-1';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: -1,
      count: -1,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: true,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|1-")', function () {

    var raw  = 'key|1-';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|1.23")', function () {

    var raw  = 'key|1.23';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: 1.23,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|.23")', function () {

    var raw  = 'key|.23';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: 0.23,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|+.23")', function () {

    var raw  = 'key|+.23';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: 0.23,
      count: 0.23,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|-1.23")', function () {

    var raw  = 'key|-1.23';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: -1.23,
      count: -1.23,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: true,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|-.23")', function () {

    var raw  = 'key|-.23';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: -0.23,
      count: -0.23,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: true,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|1-99")', function () {

    var raw  = 'key|1-99';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: 99,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|-")', function () {

    var raw  = 'key|-';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: true,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|-1-99")', function () {

    var raw  = 'key|-1-99';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: 99,
      dMin: false,
      dMax: false,
      negative: true,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|1-99.0-100")', function () {

    var raw  = 'key|1-99.0-100';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: 99,
      dMin: 0,
      dMax: 100,
      negative: false,
      decimal: true
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|1-99.-")', function () {

    var raw  = 'key|1-99.-';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: 99,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: true
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|1-99.")', function () {

    var raw  = 'key|1-99.';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: 99,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: true
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|-1-99.-")', function () {

    var raw  = 'key|-1-99.-';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: 99,
      dMin: false,
      dMax: false,
      negative: true,
      decimal: true
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|1-.-")', function () {

    var raw  = 'key|1-.-';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: true
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|-.0-2")', function () {

    var raw  = 'key|-.0-2';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: 0,
      dMax: 2,
      negative: true,
      decimal: true
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|.0-2")', function () {

    var raw  = 'key|.0-2';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: 0,
      dMax: 2,
      negative: false,
      decimal: true
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|a-b.0-2")', function () {

    var raw  = 'key|a-b.0-2';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: false,
      decimal: false
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

  it('Rule("key|-.-")', function () {

    var raw  = 'key|-.-';
    var rule = new Rule(raw);

    var ret = {
      raw: raw,
      key: 'key',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      negative: true,
      decimal: true
    };

    for (var key in ret) {
      expect(rule[key]).to.be.equal(ret[key]);
    }
  });

});
