"use strict";
module.exports = (sequelize, DataTypes, db) => {
  const SupplierProduct = sequelize.define(
    "supplierProduct",
    {
      supplierId: {
        type: DataTypes.STRING(10),
        allowNull: false,
        required: true,
        // references: {
        //   model: db.Order,
        //   key: 'id',
        // }
      },
      productId: {
        type: DataTypes.STRING(10),
        allowNull: false,
        required: true,
        // references: {
        //   model: db.Product,
        //   key: 'id',
        // }
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  return SupplierProduct;
};
