'use strict';

const bcrypt = require('bcrypt');

const models = require('../models');

var Role = models.Role;


const list = (req, res) => {
  // return all roles and their orders
  return Role.findAll({
    'attributes': [
      'role',
      'order'
    ]
  })
      .then(roles => res.status(200).send(roles))
      .catch(error => res.status(400).send(error));
};

const create = (req, res) => {
  return Role.create({
      'role': req.body.role,
      'order': Role.findAll().length + 1
    })
    .then(role => res.status(200).send(role))
    .catch(error => res.status(400).send(error));
};

const update = (req, res) => {
  var attributes = {};
  if (req.body.role) {
    attributes.role = req.body.role;
  }
  return Role
    .update({

    })
    .then(role => res.status(200).send(role))
    .catch(error => res.status(400).send(error));
};

const destroy = (req, res) => {
  Role.findAll({'role': req.params.role})
    .then(role => {
      return role.destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    });
};

module.exports = {
  'list': list,
  'create': create,
  'update': update,
  'destroy': destroy
};
