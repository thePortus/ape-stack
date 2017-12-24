const chai = require('chai');

// enable chai expect BDD
const expect = chai.expect;

// load test module
const testModule = require('../staticAssets');

// ensure environment is set to test
process.env.NODE_ENV = 'test';

describe('server', () => {

  describe('utils', () => {

    describe('staticAssets', () => {

      it('should create dev environment stylesheet static paths', (done) => {
        // temporarily change the node env
        process.env.NODE_ENV = 'development';
        let testObj = testModule.styles();
        // check that testObj is a non-empty array of strings
        expect(testObj).to.be.a('array');
        // expect more than just lib.min and app.min in a dev env
        expect(testObj.length > 2).to.be.true;
        expect(testObj[0]).to.be.a('string');
        // change the node_env back to test
        process.env.NODE_ENV = 'test';
        done();
      });

      it('should create dev environment script static paths', (done) => {
        // temporarily change the node env
        process.env.NODE_ENV = 'development';
        let testObj = testModule.scripts();
        // check that testObj is a non-empty array of strings
        expect(testObj).to.be.a('array');
        // expect more than just lib.min and app.min in a dev env
        expect(testObj.length > 2).to.be.true;
        expect(testObj[0]).to.be.a('string');
        // change the node_env back to test
        process.env.NODE_ENV = 'test';
        done();
      });

      it('should create production/test environment stylesheet static paths', (done) => {
        let testObj = testModule.styles();
        // check that testObj is a non-empty array of strings
        expect(testObj).to.be.a('array');
        expect(testObj[0]).to.be.a('string');
        // expect only 2 files in production or test env, lib.min and app.min
        expect(testObj.length === 2).to.be.true;
        done();
      });

      it('should create production/test environment script static paths', (done) => {
        let testObj = testModule.scripts();
        // check that testObj is a non-empty array of strings
        expect(testObj).to.be.a('array');
        expect(testObj[0]).to.be.a('string');
        // expect only 2 files in production or test env, lib.min and app.min
        expect(testObj.length === 2).to.be.true;
        done();
      });

    }); // staticAssets

  }); // utils

}); // server
