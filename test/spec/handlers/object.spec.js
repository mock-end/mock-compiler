var expect = require('chai').expect;

describe('handle object', function () {

  var compiler = require('../../../lib');

  it('by-bare', function () {

    var template = {
      'obj1': {
        foo: 'foo',
        bar: 'foo'
      },
      'obj2|': {
        foo: 'foo',
        bar: 'foo'
      }
    };

    var ret = compiler.compile(template);


    expect(ret).to.eql({
      'obj1': {
        foo: 'foo',
        bar: 'foo'
      },
      'obj2': {
        foo: 'foo',
        bar: 'foo'
      }
    });
  });

  it('by-count', function () {

    var kv = {
      foo: 'foo',
      bar: 'foo',
      baz: 'baz',
      qux: 'qux'
    };

    var template = {
      'obj1|1': kv,
      'obj2|2': kv,
      'obj3|-2': kv,
    };

    var ret = compiler.compile(template);

    expect(ret.obj1).to.have.any.keys(['foo', 'bar', 'baz', 'qux']);
    expect(ret.obj2).to.have.any.keys(['foo', 'bar', 'baz', 'qux']);
  });

  it('by-range', function () {

    var kv = {
      foo: 'foo',
      bar: 'foo',
      baz: 'baz',
      qux: 'qux'
    };

    var template = {
      'obj1|1-3': kv,
      'obj2|-1-3': kv,
      'obj3|.1-3': kv,
      'obj4|-.1-3': kv,
    };

    var ret = compiler.compile(template);

    expect(ret.obj1).to.have.any.keys(['foo', 'bar', 'baz', 'qux']);
    expect(ret.obj2).to.have.any.keys(['foo', 'bar', 'baz', 'qux']);
    expect(ret.obj3).to.have.any.keys(['foo', 'bar', 'baz', 'qux']);
    expect(ret.obj4).to.have.any.keys(['foo', 'bar', 'baz', 'qux']);
  });
});

