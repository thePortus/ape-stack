let chai = require('chai');
let should = chai.should();

let server = require('../../app');
let models = require('../../models');

// ensure environment is set to test
process.env.NODE_ENV = 'test';

describe('Role (model)', () => {

  describe('getPreviousModel to get item whose order property is 1 less than the current', () => {
    it('it should return false when item is first in the list', (done) => {
      var item = models.Role.findAll({where: {order: 1}, attributes: ['role', 'order']});
      should.equal(item.getPreviousModel, false);
    });
  });

});
