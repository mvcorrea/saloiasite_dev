"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        unique: true,
      },
      cat: {
        _comment: "product category",
        type: DataTypes.STRING(20),
        allowNull: false,
        required: true,
        defaultValue: "misc",
      },
      catParent: {
        _comment: "parent category",
        type: DataTypes.STRING(20),
        required: true,
        defaultValue: null,
      },
      code: {
        _comment: "product barcode",
        type: DataTypes.STRING(16),
        allowNull: true,
        required: true,
      },
      name: {
        _comment: "product name",
        type: DataTypes.STRING(30),
        allowNull: false,
        required: true,
      },
      price: {
        _comment: "product price",
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        required: true,
      },
      unit: {
        _comment: "product unit",
        type: DataTypes.ENUM,
        values: ["unid", "pack4", "pack8"],
        defaultValue: "unid",
        allowNull: false,
        required: true,
      },
      avail: {
        _comment: "product availability",
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        required: true,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: (inst, opts) => {
          inst.id = "P." + new Date().getTime().toString(36);
        },
      },
    }
  );
  Product.associate = function (models) {
    Product.belongsToMany(models.Order, {
      through: "orderProduct",
      foreignKey: "productId",
    });
    Product.belongsToMany(models.Supplier, {
      through: "supplierProduct",
      foreignKey: "productId",
    });
  };
  
  return Product;
};
