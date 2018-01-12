// load chai preconfigured with plugins
const chai = require('../testing').makeChai();

// enable chai expect/should BDD & ensure env is set to testing
const expect = chai.expect,
  should = chai.should();

// load test module
const testModule = require('../testing');
