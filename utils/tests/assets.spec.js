const chai = require('chai');
const should = chai.should();

const assets = require('../assets');

// ensure environment is set to test
process.env.NODE_ENV = 'test';

describe('Assets', () => {

    it('should create lists of js and css runtime assets', (done) => {
      let testAssets = {
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

    it('should give a list of locale source patterns', (done) => {
      let testAssets = new assets.locale().sources();
      // must be an array with valid string in first position
      testAssets.should.be.a('array');
      testAssets[0].should.be.a('string');
      // must match first item in localeSrc pattern specified in assets.js
      testAssets[0].endsWith('angular-i18n/*.js').should.equal(true);
      done();
    });

});
