"use strict";
module.exports = (sequelize, DataTypes) => {
  // singualr upcase
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        unique: true,
      },
      phone: {
        _comment: "user phone",
        type:DataTypes.ARRAY(DataTypes.STRING(20)),
        //type: DataTypes.STRING(20),
        allowNull: false,
        required: true,
      },
      name: {
        _comment: "user name",
        type: DataTypes.STRING,
        allowNull: true,
        required: true,
      },
      addr: {
        _comment: "user address",
        type: DataTypes.JSON,
        allowNull: true,
        required: false,
      },
      active: {
        _comment: "user active (could be used in advertisement)",
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        required: true,
      },
      lstMsg: {
        _comment: "time of the last user iteraction",
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
          inst.id = "U." + new Date().getTime().toString(36);
        },
      },
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Order, { foreignKey: "userId" }); // upcase singular
    User.hasMany(models.Message, { foreignKey: "userId" }); // upcase singular
    //User.belongsToMany(models.Delivery, { through: 'Orders' });
  };
  return User;
};
