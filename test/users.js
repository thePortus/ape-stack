
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let User = require('../server/models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
var server = require('../bin/www');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
/*
  * Test the /GET route
  */
  describe('/POST user', () => {

    // empty the table before tests
    console.log(User);
    User.destroy();

    let user = {
      username: 'fake',
      password: 'fake',
      password2: 'fake',
      email: 'fake@fake.com',
      firstName: 'Sue Doe',
      lastName: 'Von McFakington',
      role: 'user',
      about: 'I\'m a cruel mockery of humanity!'
    };

    it('it should INSERT a user', (done) => {
      chai.request('http://localhost:3000')
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          console.log('*********');
          console.log('Error msg', err);
          console.log('*********');
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

});
