const chai = require('chai');

// enable chai expect BDD
const expect = chai.expect;

// load test module
const testModule = require('../env');

// ensure environment is set to test
process.env.NODE_ENV = 'test';

describe('utils', () => {

  describe('env', () => {

    describe('currentEnv()', () => {
      it('should determine the current node env', (done) => {
        let testObj = testModule.currentEnv();
        expect(testObj).to.be.a('string');
        expect(testObj).to.equal(process.env.NODE_ENV);
        done();
      });
    }); // currentEnv

    describe('isDevEnv()', () => {

      it('should be false in a test (or production) env', (done) => {
        expect(testModule.isDevEnv()).to.equal(false);
        done();
      });

      it('should be true if env switched to development', (done) => {
        // switch node env to 'development' (switch back on finish)
        process.env.NODE_ENV = 'development';
        expect(testModule.isDevEnv()).to.equal(true);
        process.env.NODE_ENV = 'test';
        done();
      });

    }); // isDevEnv

  }); // env

}); // utils
