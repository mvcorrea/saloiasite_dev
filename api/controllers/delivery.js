const moment = require("moment");
const db = require("../models");
const Delivery = db.Delivery;
const Op = db.Sequelize.Op;

// Create a new delivery
exports.createDelivery = (req, res, next) => {
  const dlv = {
    id: req.body.id,
    //orderId: req.body.orderid,
    agent: req.body.agent,
    status: req.body.status,
    deliveryId: req.body.deliveryid,
  };
  Delivery.create(dlv)
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

// List any/all deliveries
exports.findAllDeliveries = (req, res, next) => {
  const { agent, status, time } = req.query;
  let options = { where: {}, include: [{ model: db.Order }] };
  const openTime = (t) => {
    const time = new Date(new Date().setUTCHours(-t * 24 || 0, 0, 0, 0));
    console.log(time);
    return time;
  };

  agent ? (options.where.agent = { [Op.like]: `%${agent}%` }) : null; // string
  status ? (options.where.status = tmp = status === "true") : null; // boolean
  time
    ? (options.where.time = { [Op.gt]: openTime(time) })
    : null //(options.where.time = { [Op.gt]: openTime() });

  Delivery.findAll(options)
    .then((data) => res.send(data))
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

// Find a single delivery with an id
exports.findDelivery = (req, res, next) => {
  const id = req.params.id;

  Delivery.findByPk(id, {
    include: [{ model: db.Order, include: [db.User] }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};
