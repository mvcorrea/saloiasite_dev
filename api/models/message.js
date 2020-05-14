"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "messages",
    {
      id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        unique: true,
      },
      userId: {
        type: DataTypes.STRING(10),
        //allowNull: false,
        //required: true,
      },
      time: {
        _comment: "message time",
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      msg: {
        _comment: "message content",
        type: DataTypes.JSON,
        required: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (inst, opts) => {
          inst.id = "M." + new Date().getTime().toString(36);
        },
      },
    }
  );
  Message.associate = function (models) {
    Message.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Message;
};
