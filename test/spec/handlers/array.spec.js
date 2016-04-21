var expect = require('chai').expect;

describe('handler array', function () {

  var compiler = require('../../../lib/index');

  it('by-bare', function () {

    var template = {
      'arr1': [1, 2, 3],
      'arr2|': [1, 2, 3]
    };

    var ret = compiler.compile(template);

    expect(ret).to.eql(ret);
    expect(ret.arr1).to.eql([1, 2, 3]);
    expect(ret.arr2).to.eql([1, 2, 3]);
  });

  it('by-count', function () {

    var template = {
      'arr1|0': [1, 2],    // repeat 0 times
      'arr2|-0': [1, 2],   // pick 0 item
      'arr3|2': [1, 2],    // repeat 2 times
      'arr4|-1': [1, 2],   // pick 1 item
      'arr5|-2': [1, 2],   // pick 2 items
    };

    var ret = compiler.compile(template);

    expect(ret.arr1).to.eql([1, 2]);
    expect(ret.arr2).to.eql([]);
    expect(ret.arr3).to.eql([1, 2, 1, 2]);
    expect(ret.arr4).to.have.length(1);
    expect(ret.arr4[0]).to.be.oneOf([1, 2]);
    expect(ret.arr5).to.have.length(2);
    expect(ret.arr5).to.include.members([1, 2]);
  });

  it('by-range', function () {

    var template = {
      'arr1|0-0': [1, 2],     // repeat 0 times
      'arr2|-0-0': [1, 2],    // pick 0 item
      'arr3|2-2': [1, 2],     // repeat 2 times
      'arr4|-1-1': [1, 2],    // pick 1 item
      'arr5|-2-2': [1, 2],    // pick 2 items
      'arr6|0-2': [1, 2],     // randomly repeat 0~2 times
      'arr7|.0-2': [1, 2],      // randomly repeat 0~2 times
      'arr8|-.0-2': [1, 2],     // randomly pick 0~2 items
      'arr9|a-b.0-2': [1, 2],   // bad range
    };


    var ret = compiler.compile(template);


    expect(ret.arr1).to.eql([1, 2]);

    expect(ret.arr2).to.eql([]);

    expect(ret.arr3).to.eql([1, 2, 1, 2]);

    expect(ret.arr4).to.have.length(1);
    expect(ret.arr4[0]).to.be.oneOf([1, 2]);

    expect(ret.arr5).to.have.length(2);
    expect(ret.arr5).to.include.members([1, 2]);

    expect(ret.arr6.length).to.be.within(2, 4);
    expect(ret.arr6).to.include.members([1, 2]);

    expect(ret.arr7.length).to.be.within(2, 4);
    expect(ret.arr7).to.include.members([1, 2]);

    expect(ret.arr8.length).to.be.within(0, 2);

    expect(ret.arr9).to.eql([1, 2]);
  });
});

