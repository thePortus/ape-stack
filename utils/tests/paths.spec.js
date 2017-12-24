const chai = require('chai');

// enable chai expect BDD
const expect = chai.expect;

// load test module
const testModule = require('../paths');

// ensure environment is set to test
process.env.NODE_ENV = 'test';

describe('utils', () => {

  describe('paths', () => {

    describe('isIterable', () => {
      it('should be true when given an iterable', (done) => {
        expect(testModule.isIterable(['a', 'b', 'c']))
          .to.equal(true);
        done();
      });

      it('should be false when given non-iterable', (done) => {
        expect(testModule.isIterable(4))
          .to.equal(false);
        done();
      });
    }); // isIterable

    describe('basenamesFromPaths', () => {

      it('should not throw an error when given an array of strings', (done) => {
        expect(() => { testModule.basenamesFromPaths(['./test/test0.txt', './test/test1.txt']);})
          .to.not.throw();
        done();
      });

      it('should throw an error when given a non-iterable', (done) => {
        expect(() => { testModule.basenamesFromPaths(1);})
          .to.throw('Argument must be an iterable object, non-iterable item passed');
        done();
      });

      it('should throw an error if any item in iterable is non-string.', (done) => {
        expect(() => { testModule.basenamesFromPaths(['1', 2, '3']);})
          .to.throw('Iterable must only contain strings, argument contains non-string item(s)');
        done();
      });

      it('should give array of basenames corresponding to given paths', (done) => {
        let testObj = testModule.basenamesFromPaths(['./test/test0.txt', './test/test1.txt']);
        expect(testObj).to.have.a.lengthOf(2);
        expect(testObj).to.have.property(0).which.equals('test0.txt');
        done();
      });

    }); // basenamesFromPaths

    describe('buildPaths', () => {

      it('should throw an error if paths is not iterable', (done) => {
        expect(() => { testModule.buildPaths(1, 'test');})
          .to.throw('Argument must be an iterable object, non-iterable item passed');
        done();
      });

      it('should throw an error if paths contains non-string item (shallow only)', (done) => {
        expect(() => { testModule.buildPaths(['1', 2, '3'], 'test'); })
          .to.throw('Iterable must only contain strings, argument contains non-string item(s)');
        done();
      });

      it('should throw an error if prefix/suffix is extant but non-string or iterable containing non-strings', (done) => {
        done();
      });

      it('should prepend a string prefix to list of paths', (done) => {
        done();
      });



      it('should accept an array of path elements for prefix/suffix', (done) => {
        done();
      });

    }); // buildPaths

  }); // paths

}); // utils
