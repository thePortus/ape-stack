/* Protractor config file */

const protractorConfiguration = {
  framework: 'mocha',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['client/**/tests/**/*.spec.js'],
  multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }],
  mochaOpts: {
  reporter: "spec",
  slow: 3000
}
};

exports.config = protractorConfiguration;
