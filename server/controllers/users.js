const bcrypt = require('bcrypt');

const models = require('../models');

const User = models.User;

function create(req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  // validation
  if (!username || !email || !password || !password2) {
    return res.status(400).send({
      message: 'Missing username, email, or passwords',
    });
  }

  if (password !== password2) {
    return res.status(400).send({
      message: 'Passwords do not match',
    });
  }
  // generating authentication salt/hash
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return User
    .create({
      username: username,
      email: email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      about: req.body.about,
      salt: salt,
      role: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
}

function list(req, res) {
  return User
      .findAll({
        attributes: [
          'username',
          'email',
          'firstName',
          'lastName',
          'about',
          'role',
          'createdAt',
          'updatedAt'
        ]
      })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
}

function read(req, res) {
  return User
    .findById(req.params.user_id, {
      attributes: [
        'username',
        'email',
        'firstName',
        'lastName',
        'about',
        'role',
        'createdAt',
        'updatedAt'
      ]
    })
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error));
}

function update(req, res) {
  return User
    .findById(req.params.user_id, {
      //include: [{
      //  model: UserMeta,
      //  as: 'userMeta',
      //}],
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return user
        .update({
          about: req.body.about || user.about,
          firstName: req.body.firstName || user.firstName,
          lastName: req.body.lastName || user.lastName,
          updatedAt: Date.Now()
        })
        .then(() => res.status(200).send(user))  // Send back the updated user.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}

function destroy(req, res) {
  return User
    .findById(req.params.user_id)
    .then(user => {
      if (!user) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
}

module.exports = {
  'create': create,
  'list': list,
  'read': read,
  'update': update,
  'destroy': destroy
};
