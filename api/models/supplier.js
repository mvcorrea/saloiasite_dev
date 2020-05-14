"use strict";
module.exports = (sequelize, DataTypes) => {
  // singualr upcase
  const Supplier = sequelize.define(
    "supplier",
    {
      id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        required: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        required: true,
      },
      addr: {
        type: DataTypes.JSON,
        allowNull: true,
        required: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        required: true,
      },
      lstMsg: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (inst, opts) => {
          inst.id = "S." + new Date().getTime().toString(36);
        },
      },
    }
  );
  Supplier.associate = function (models) {
    //Supplier.hasMany(models.Order, { foreignKey: "userId" }); // upcase singular
    //User.belongsToMany(models.Delivery, { through: 'Orders' });
    Supplier.belongsToMany(models.Product, { through: 'supplierProduct', foreignKey: "supplierId" });
  };
  return Supplier;
  
};
