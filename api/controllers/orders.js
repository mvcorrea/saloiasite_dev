const moment = require("moment");
const db = require("../models");
const Order = db.Order;
const Op = db.Sequelize.Op;

// Create an Order
exports.createOrder = (req, res, next) => {
  const order = {
    id: req.body.id,
    deliveryId: req.body.deliveryid,
    userId: req.body.userid,
    items: req.body.items,
  };
  Order.create(order)
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

// List any/all orders
exports.findAllOrders = (req, res, next) => {
  const { userid, dlvid, status, last } = req.query;
  let options = { where: {} };
  let where = options.where;

  dlvid ? (where.dlvId = { [Op.like]: `%${dlvid}%` }) : null;
  status ? (where.status = status) : null;
  last
    ? (where.orderTime = { [Op.gt]: moment().subtract(last, "hours").toDate() })
    : null;

  Order.findAll(options)
    .then((data) => res.send(data))
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

// Find a single order with an id
exports.findOrder = (req, res, next) => {
  const id = req.params.id;

  Order.findByPk(id, {
    include: [
      { model: db.User },
      { model: db.Delivery },
      { model: db.Product },
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
