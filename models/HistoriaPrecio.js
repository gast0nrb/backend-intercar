const { DataTypes } = require("sequelize");
const sq = require("../database/connection");

const HistoriaPrecio = sq.define(
  "HistoriaPrecio",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_producto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    fk_lp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descuento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = HistoriaPrecio;
