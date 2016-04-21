var expect = require('chai').expect;

describe('presets:step', function () {

  var compiler = require('../../../lib/');

  it('by-step', function () {

    var template = {
      'step1|+1': 1.5,
      'step2|-1': 1,
      'step3|+.2': 1,
      'step4|-0.2': 1
    };

    var ret = compiler.compile(template);

    expect(ret.step1).to.equal(1.5);
    expect(ret.step2).to.equal(1);
    expect(ret.step3).to.equal(1);
    expect(ret.step4).to.equal(1);

    ret = compiler.compile(template);
    expect(ret.step1).to.equal(2.5);
    expect(ret.step2).to.equal(0);
    expect(ret.step3).to.equal(1.2);
    expect(ret.step4).to.equal(0.8);

    ret = compiler.compile(template);
    expect(ret.step1).to.equal(3.5);
    expect(ret.step2).to.equal(-1);
    expect(ret.step3).to.equal(1.4);
    expect(ret.step4).to.equal(0.6);
  });
});

