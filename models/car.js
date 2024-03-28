"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  car.init(
    {
      // id: {
      //   allowNull: false,
      //   primaryKey: true,
      //   type: DataTypes.UUID,
      //   defaultValue: DataTypes.UUIDV4 // Untuk mengisi kolom ID dengan UUID secara otomatis
      // },
      name: DataTypes.STRING,
      rent_day: DataTypes.BIGINT,
      size: DataTypes.STRING,
      photo: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "car",
      paranoid: true,
    }
  );
  return car;
};
