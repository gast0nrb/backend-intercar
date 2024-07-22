const sq = require("../database/connection");
const { DataTypes } = require("sequelize");

const ListaPrecio = sq.define(
  "ListaPrecio",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ListaPrecio;
