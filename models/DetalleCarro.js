const sq = require("../database/connection");
const { DataTypes } = require("sequelize");

const DetalleCarro = sq.define(
  "DetalleCarro",
  {
    fk_carro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    fk_producto: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_lista: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre_lista: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    descuento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    monto : {
      type : DataTypes.INTEGER,
      allowNull : false
    }
  },
  { timestamps: true, freezeTableName: true, paranoid: true }
);

module.exports = DetalleCarro;
