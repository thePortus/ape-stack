'use strict';

const bcrypt = require('bcrypt');

const models = require('../models');

var Role = models.Role;

/*
Methods
 */

Role.prototype.getPreviousModel = function() {
  // return false if the first item
  if (this.order === 1) {
    return false;
  }
  return Role.findAll({where: {
    order: this.order - 1
  }});
};

Role.prototype.getNextModel = () => {
  // return false if the last item
  if (this.order === Role.findAll().length) {
    return false;
  }
  return Role.findAll({where: {
    order: this.order + 1
  }});
};

Role.prototype.decreaseOrder = () => {
  // return false if the first item
  if (this.order === 1) {
    return false;
  }
  // get previous ordered item, then swap their orders
  var otherModel = this.getPreviousModel();
  this.order -= 1;
  otherModel.order += 1;
  this.save();
  otherModel.save();
  return this;
};

Role.prototype.increaseOrder = () => {
  // return false if the last item
  if (this.order === Role.findAll().length) {
    return false;
  }
  // get next ordered item, then swap their orders
  var otherModel = this.getNextModel();
  this.order += 1;
  otherModel.order -= 1;
  this.save();
  otherModel.save();
  return this;
};

Role.prototype.removeRole = () => {
  var currentModel = this.getNextModel();
  // destroy this instance
  this.destroy();
  // iterate through succeeding ordered items and decrement their order by 1
  while (currentModel !== false) {
    currentModel.order -= 1;
    currentModel.save();
    currentModel = currentModel.getNextModel();
  }
  return true;
};

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
