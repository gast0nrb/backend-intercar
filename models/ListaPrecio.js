const sq = require("../database/connection");
const { DataTypes } = require("sequelize");
const ListaProducto = require("./ListaProducto");

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
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: false,
  }
);

ListaPrecio.hasMany(ListaProducto, {
  foreignKey: {
    name: "fk_lista",
    allowNull: false,
  },
  sourceKey: "id",
});

ListaProducto.belongsTo(ListaPrecio, {
  foreignKey: {
    name: "fk_lista",
    allowNull: false,
  },
  targetKey: "id",
});

module.exports = ListaPrecio;
