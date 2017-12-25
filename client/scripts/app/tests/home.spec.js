const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Home Controller', function() {
  it('should have a title', function() {
    browser.get('http://localhost:3000');
    expect(browser.getTitle()).to.eventually.equal('APE-Stack Server');
  });
});
