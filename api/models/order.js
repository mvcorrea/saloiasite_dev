"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "orders",
    {
      id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        unique: true,
      },
      userId: {
        _comment: "user reference",
        type: DataTypes.STRING(10),
        allowNull: false,
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
        // onUpdate: "CASCADE",
        // onDelete: "SET NULL",
      },
      deliveryId: {
        _comment: "delivery reference",
        type: DataTypes.STRING(10),
        allowNull: true,
        // references: {
        //   model: "Deliveries",
        //   key: "id",
        // },
        // onUpdate: "CASCADE",
        // onDelete: "SET NULL",
      },
      time: {
        _comment: "order time",
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      status: {
        _comment: "order status",
        type: DataTypes.ENUM,
        values: ["preparo", "entrega", "finalizada", "cancelada"],
        defaultValue: "preparo",
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (inst, opts) => {
          inst.id = "O." + new Date().getTime().toString(36);
        },
      },
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "userId" });
    Order.belongsTo(models.Delivery, { foreignKey: "deliveryId" });
    Order.belongsToMany(models.Product, { through: 'orderProduct', foreignKey: "orderId" });
  };

  return Order;
};
