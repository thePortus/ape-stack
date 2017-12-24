const chai = require('chai');

// enable chai expect BDD
const expect = chai.expect;

// load test module
const testModule = require('../assets');

// ensure environment is set to test
process.env.NODE_ENV = 'test';

describe('utils', () => {

  describe('assets', () => {

    describe('runtime', () => {

      describe('assets', () => {

        it('should create a list of vendor and internal css assets', (done) => {
          let testObj = new testModule.runtime('css').assets;
          expect(testObj).to.be.a('array');
          expect(testObj.length).to.be.above(0);
          expect(testObj[0]).to.be.a('string');
          done();
        });

        it('should create a list of vendor and internal js assets', (done) => {
          let testObj = new testModule.runtime('js').assets;
          expect(testObj).to.be.a('array');
          expect(testObj.length).to.be.above(0);
          expect(testObj[0]).to.be.a('string');
          done();
        });

      }); // assets

    }); // runtime

  }); // assets

}); // utils
