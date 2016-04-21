var expect = require('chai').expect;

describe('handle string', function () {

  var compiler = require('../../../lib');

  it('without placeholder', function () {

    var template = {
      'str1': 'str1',
      'str2|2': 'str2',
      'str3|2-2': 'str3',
      'str4|-.2-2': 'str4',
      'str5|4': '',
      'str6|1-9': '',
      'str7|0': '',
      'str8|': 'str8',
    };

    var ret = compiler.compile(template);

    expect(ret.str1).to.equal('str1');
    expect(ret.str2).to.equal('str2str2');
    expect(ret.str3).to.equal('str3str3');
    expect(ret.str4).to.equal('str4str4');
    expect(ret.str5.length).to.equal(4);
    expect(ret.str6.length).to.be.within(1, 9);
    expect(ret.str7).to.equal('');
    expect(ret.str8).to.equal('str8');
  });


  it('placeholders', function () {

    var count = 100;

    while (count--) {
      var template = {
        'str1': '@int(1,9)',
        'str2': '\\@int(1,9)',
        'str21': '\\@int (1,9)',
        'str3': 'str-@int(3,3)',
        'str4': '@@int (4,4)',
        'str5': '@int',
        'str6': '@int()',
        'str7': '@int(,)',
        'str8': '@int(()',
        'str9': '@string("(abc)",10)',
      };

      var ret = compiler.compile(template);

      expect(ret.str1).to.be.within(1, 9);
      expect(ret.str2).to.equal('@int(1,9)');
      expect(ret.str21).to.equal('@int (1,9)');
      expect(ret.str3).to.equal('str-3');
      expect(ret.str4).to.equal('@4');
      expect(ret.str5).to.be.a('number');
      expect(ret.str6).to.be.a('number');

      expect(ret.str7)
        .to.be.a('string')
        .and
        .to.have.string('ERROR');
      expect(ret.str8)
        .to.be.a('string')
        .and
        .to.have.string('ERROR');

      expect(ret.str9)
        .to.be.a('string')
        .and
        .to.have.length(10)
        .and
        .to.be.match(/^[\(\)a-c]+$/);

    }
  });
});

