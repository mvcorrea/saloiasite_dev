const moment = require("moment");
const db = require("../models");
const Product = db.Product;
const Op = db.Sequelize.Op;



// Create an Product
exports.createProduct = (req, res, next) => {
    const product = {
      id: req.body.id,
      cat: req.body.cat,
      name: req.body.name,
      price: req.body.price,
    };
    Product.create(product)
      .then((data) => res.status(201).send(data))
      .catch((err) => {
        err.status = 500;
        next(err);
      });
  
  };
  
  // List any/all Products
  exports.findAllProducts = (req, res, next) => {
    const { userid, dlvid, avail, last } = req.query;
    let options = { where: {} };
    let where = options.where;
  
    dlvid ? (where.dlvId = { [Op.like]: `%${dlvid}%` }) : null;
    avail ? (where.avail = avail) : null;
    last
      ? (where.productTime = { [Op.gt]: moment().subtract(last, "hours").toDate() })
      : null;
  
    Product.findAll(options)
      .then((data) => res.send(data))
      .catch((err) => {
        err.status = 500;
        next(err);
      });
  };
  
  // Find a single Product with an id
  exports.findProduct = (req, res, next) => {
    const id = req.params.id;
  
    Product.findByPk(id, {
      include: [{ model: db.Order }],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        err.status = 500;
        next(err);
      });
  };