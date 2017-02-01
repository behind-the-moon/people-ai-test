global.window = {};
global.window.fetch = global.fetch = require('node-fetch');

var expect = require('chai').expect;
var monthRange = require('../app/tools/month-range');
var fixer = require('../app/tools/fixer-api');

describe('Test fixer api', function () {
  it('should insert polyfills', function () {
    expect(Promise).to.be.exist;
    expect(window.fetch).to.be.exist;
  });

  it('should make range request', function (done) {
    fixer(monthRange(), 'EUR', 'RUB').then(function (data) {
      expect(data).to.be.an('array');
      done();
    });
  });
});
