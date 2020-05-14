"use strict";
module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define(
    "deliveries",
    {
      id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        unique: true,
      },
      agent: {
        _comment: "delivery responsible",
        type: DataTypes.STRING,
        defaultValue: "Entregador 01",
        allowNull: false,
      },
      status: {
        _comment: "delivery status",
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        required: true,
      },
      time: {
        _comment: "delivery time",
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
      // name: {
      //   singular: 'delivery',
      //   plural: 'deliveries',
      // },
      hooks: {
        beforeCreate: (inst, opts) => {
          inst.id = "D." + new Date().getTime().toString(36);
        },
      },
    }
  );
  Delivery.associate = function (models) {
    Delivery.hasMany(models.Order, { foreignKey: "deliveryId" });
    //Delivery.belongsToMany(models.User, { through: 'Orders' });
  };

  return Delivery;
};
