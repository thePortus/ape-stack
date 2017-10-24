let chai = require('chai');
let should = chai.should();

let server = require('../app');
let models = require('../models');

// ensure environment is set to test
process.env.NODE_ENV = 'test';

describe('App', () => {

    it('should connect to the DB', (done) => {
    models.sequelize.authenticate()
      .then((err) => {
        should.equal(err, undefined);
        done();
      });
  });

});
