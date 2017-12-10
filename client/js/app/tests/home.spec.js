/**
 * <%= testPath %>
 * @file
 *
 * <%= projectName %> : <%= moduleName %> : <%= componentName %>
 * <%= documentAuthor %>
 *
 * Test file for <%= componentPath %>
 * <%= documentDescription %>
 *
 * Created with the Ape-Stack Yeoman Generator
 * Copyright (c) 2016 David J. Thomas, dave.a.base@gmail.com
 * http://thePortus.com | https://github.com/thePortus
 */

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
