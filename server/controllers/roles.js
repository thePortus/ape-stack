'use strict';

const models = require('../models');

var Model = models.Role;

const list = (req, res) => {
  // return all roles and their orders
  return Model.findAll({
    'order': [['order', 'ASC']],
    'attributes': [
      'role',
      'order'
    ]
  })
    .then(roles => res.status(200).send(roles))
    .catch(error => res.status(400).send(error));
};

const create = (req, res) => {
  return Model.create({
    'role': req.body.role,
    'order': Model.findAll().length + 1
  })
    .then(role => res.status(200).send(role))
    .catch(error => res.status(400).send(error));
};

const update = (req, res) => {
  var attributes = {};
  if (req.body.role) {
    attributes.role = req.body.role;
  }
  else {
    return false;
  }
  Model.findById(attributes.role)
    .then((updateRecord) => {
      return updateRecord
        .update(attributes)
        .then(role => res.status(200).send(role))
        .catch(error => res.status(400).send(error));
    });
};

const increment = (req, res) => {
  if (!req.body.role) {
    return false;
  }
  Model.findById(!req.body.role)
    .then((currentRecord) => {
      Model.findAll({where: {order: currentRecord.order + 1}})
        .then((otherRecord) => {
          if (!otherRecord) {
            return false;
          }
          currentRecord.order += 1;
          otherRecord.order -= 1;
          currentRecord.save();
          otherRecord.save();
          return currentRecord;
        });
    });
};

const decrement = (req, res) => {
  if (!req.body.role) {
    return false;
  }
  Model.findById(!req.body.role)
    .then((currentRecord) => {
      if (currentRecord.order === 1) {
        return false;
      }
      Model.findAll({where: {order: currentRecord.order - 1}})
        .then((otherRecord) => {
          if (!otherRecord) {
            return false;
          }
          currentRecord.order -= 1;
          otherRecord.order += 1;
          currentRecord.save();
          otherRecord.save();
          return currentRecord;
        });
    });
};

const destroy = (req, res) => {
  Model.findAll({'role': req.params.role})
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
  'increment': increment,
  'decrement': decrement,
  'destroy': destroy
};
