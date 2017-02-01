var expect = require('chai').expect;

describe('Test application bootsrap', function () {
  it('should has currencies component', function () {
    var currencies = require('../app/tools/currency-list.js');

    expect(currencies).to.be.an('array');
    expect(currencies.length > 5).to.be.true;
  });

  it('should create month range array', function () {
    var monthRange = require('../app/tools/month-range');

    var range = monthRange(new Date('1999/10/15'));

    expect(range[0]).to.be.equal('1999-09-26');
    expect(range[range.length - 1]).to.be.equal('1999-10-15');

    /* 30 days month */
    expect(range.length).to.be.equal(20);

    /* 31 days month */
    expect(monthRange(new Date('1999/11/12')).length).to.be.equal(20);
  });

  it('shoud create month range without arguments', function () {
    var monthRange = require('../app/tools/month-range');

    var range = monthRange();

    /* to be something. it cannot be wrong */
    expect(range).to.be.an('array');
    expect(range.length > 1).to.be.true;
  });
});
