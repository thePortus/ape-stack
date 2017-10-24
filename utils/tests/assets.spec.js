let chai = require('chai');
let should = chai.should();

let assets = require('../assets');

// ensure environment is set to test
process.env.NODE_ENV = 'test';

describe('Assets', () => {

    it('should create lists of js and css runtime assets', (done) => {
      var testAssets = {
        'runtimeJs': new assets.runtime('js').assets,
        'runtimeCss': new assets.runtime('css').assets
      };
      // check that js assets is a non-empty array of strings
      testAssets.runtimeJs.should.be.a('array');
      should.equal(testAssets.runtimeJs.length > 0, true);
      testAssets.runtimeJs[0].should.be.a('string');
      // ensure that css assets are the same
      testAssets.runtimeCss.should.be.a('array');
      should.equal(testAssets.runtimeCss.length > 0, true);
      testAssets.runtimeCss[0].should.be.a('string');

      done();
    });

});
