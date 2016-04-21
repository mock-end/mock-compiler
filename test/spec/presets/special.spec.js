var expect = require('chai').expect;

describe('presets:special', function () {

  var compiler = require('../../../lib/');

  it('fromData', function () {

    var template = {
      'key1': '@fromData("a")',
      'key2': '@fromData(["a","b"])',
      'key3': '@fromData({ a: 1, c: "2" })',
      'key4': '@fromData(1)'
    };

    var data = { a: 1, b: "2", c: 3 };
    var ret  = compiler.compile(template, data);

    expect(ret.key1).to.equal(1);
    expect(ret.key2).to.eql({ a: 1, b: "2" });
    expect(ret.key3).to.eql({ a: 1, c: 3 });
    expect(ret.key4).to.equal(1);

    ret = compiler.compile(template);

    expect(ret.key1).to.equal(undefined);
    expect(ret.key2).to.eql({ a: undefined, b: undefined });
    expect(ret.key3).to.eql({ a: undefined, c: undefined });
    expect(ret.key4).to.equal(1);
  });

  it('fromFile', function () {

    var template = {
      'key1': '@fromFile()',
      'key2': '@fromFile("asd")',
      'key3': '@fromFile("/a/b/c")',
      'key4': '@fromFile("test/data/")',
      'key5': '@fromFile("./test/data/yaml.yaml")',
      'key6': '@fromFile("./test/data/json.json")',
      'key7': '@fromFile("./test/data/log.log")',
    };

    var ret = compiler.compile(template);

    expect(ret.key1)
      .to.be.a('string')
      .and
      .to.have.string('no file');

    expect(ret.key2)
      .to.be.a('string')
      .and
      .to.have.string('Error');

    expect(ret.key3)
      .to.be.a('string')
      .and
      .to.have.string('Error');

    expect(ret.key4)
      .to.be.a('string')
      .and
      .to.have.string('Error');

    expect(ret.key5).to.be.eql({
      foo: 'bar',
      baz: 'qux'
    });

    expect(ret.key6).to.be.eql({
      foo: 'bar',
      baz: 'qux'
    });

    expect(ret.key7)
      .to.be.a('string')
      .and
      .to.have.string('Error');

    // require cache
    ret = compiler.compile(template);

    expect(ret.key6).to.be.eql({
      foo: 'bar',
      baz: 'qux'
    });

  });
});

