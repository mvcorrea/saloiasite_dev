"use strict";
module.exports = (sequelize, DataTypes, db) => {
  const OrderProduct = sequelize.define(
    "orderProduct",
    {
      orderId: {
        type: DataTypes.STRING(10),
        // references: {
        //   model: db.Order, 
        //   key: 'id',
        // }
      },
      productId: {
        type: DataTypes.STRING(10),
        // references: {
        //   model: db.Product,
        //   key: 'id',
        // }
      },
      quantity: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 1.00,
      },
      options: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  return OrderProduct;
};

/*
Executing (default): 
CREATE TABLE IF NOT EXISTS "order_product" (
  "order_id" VARCHAR(255)  REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
  "product_id" VARCHAR(255)  REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
  "options" VARCHAR(255), UNIQUE ("order_id", "product_id"), 
PRIMARY KEY ("order_id","product_id")
);
*/