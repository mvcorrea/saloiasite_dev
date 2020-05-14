const moment = require("moment");
const db = require("../models");
const Message = db.Message;
const Op = db.Sequelize.Op;

// Create a new user
exports.createMessage = (req, res, next) => {
  console.log(req.body);

  const msg = {
    id: req.body.id,
    userId: req.body.userId,
    msg: req.body.msg,
  };

  const number = msg.msg.number; // phone number is inside msg
  db.User.findOrCreate({
    where: { phone: { [Op.contains]: [number] } },
    defaults: { phone: [number] },
  })
    .then((result) => {
      const [object, created] = result; // found/created user
      msg.userId = object.id; // update userId in message
      Message.create(msg)
        .then((data) => res.status(201).send(data))
        .catch((err) => {
          err.status = 500;
          next(err);
        });
    })
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

// List any/all Messages
exports.findAllMessages = (req, res, next) => {
  const { phone, user, active, last } = req.query;
  let options = { where: {}, include: [{ model: db.User }] };

  phone ? (options.where.msg.number = { [Op.like]: `%${phone}%` }) : null; // string
  user ? (options.where.user = { [Op.like]: `%${user}%` }) : null; // string
  active ? (options.where.active = tmp = active === "true") : null; // boolean
  last
    ? (options.where.lstMsg = {
        [Op.gt]: moment().subtract(last, "hours").toDate(),
      })
    : null;

  Message.findAll(options)
    .then((data) => res.send(data))
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

// Find a single user with an id
exports.findMessage = (req, res, next) => {
  const id = req.params.id;
  const { last } = req.query;
  Message.findByPk(id, {
    include: [
      { model: db.Order, limit: last || 5, include: [db.Delivery] },
      { model: db.Message },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

exports.findUserDeliveries = (req, res, next) => {
  const id = req.params.id;
};
