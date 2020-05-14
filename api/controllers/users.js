const moment = require("moment");
const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

// Create a new user
exports.createUser = (req, res, next) => {
  console.log(req.body);
  const user = {
    id: req.body.id,
    phone: req.body.phone,
    name: req.body.name,
    addr: req.body.addr,
    active: req.body.active,
    lstMsg: req.body.last,
  };
  User.create(user)
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

// List any/all users
exports.findAllUsers = (req, res, next) => {
  const { phone, active, last } = req.query;
  let options = { where: {} };

  phone ? (options.where.phone = { [Op.like]: `%${phone}%` }) : null; // string
  active ? (options.where.active = tmp = active === "true") : null; // boolean
  last
    ? (options.where.lstMsg = {
        [Op.gt]: moment().subtract(last, "hours").toDate(),
      })
    : null;

  User.findAll(options)
    .then((data) => res.send(data))
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

// Find a single user with an id
exports.findUser = (req, res, next) => {
  const id = req.params.id;
  const { last } = req.query;
  User.findByPk(id, {
    include: [
      { model: db.Order, limit: last || 5, include: [db.Delivery] },
      { model: db.Message, limit: last || 6 },
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

// Find a single user with an phone number
exports.findUserPhone = (req, res, next) => {
  const phone2find = req.params.phone;
  const { last } = req.query;

  const options = {
    where: { phone: { [Op.contains]: [phone2find] } },
    defaults: { phone: [phone2find] },
  };

  User.findOrCreate(options)
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
