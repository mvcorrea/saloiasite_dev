console.log("in models");

//const path = require('path');
const env = process.env.NODE_ENV || "development";
const config = require("./database.json")[env];

const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// "query": { "raw": true }

const db = {};

// squemas
db.User = require("./user")(sequelize, DataTypes);
db.Delivery = require("./delivery")(sequelize, DataTypes);
db.Order = require("./order")(sequelize, DataTypes);
db.Product = require("./product")(sequelize, DataTypes)
db.OrderProduct = require("./orderProduct")(sequelize, DataTypes, db); // coupling table (order/product)
db.Supplier = require("./supplier")(sequelize, DataTypes);
db.SupplierProduct = require("./supplierProduct")(sequelize, DataTypes, db); // coupling table (supplier/product)
db.Message = require("./message")(sequelize, DataTypes);

// associations
db.User.associate(db);
db.Delivery.associate(db);
db.Order.associate(db);
db.Product.associate(db);
db.Supplier.associate(db);
db.Message.associate(db);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
