const sq = require("../database/connection");
const { DataTypes } = require("sequelize");
const ListaProducto = require("./ListaProducto");

const Producto = sq.define(
  "Producto",
  {
    codigo: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "/defaultImage.png",
    },
  },
  {
    timestamps: true,
    freezeTableName : true
  }
);

Producto.hasMany(ListaProducto, {
  foreignKey : {
    allowNull : false,
    name :  "fk_producto",
  },
  sourceKey : "codigo"
});

ListaProducto.belongsTo(Producto, {
  foreignKey : {
    allowNull : false,
    name  : "fk_producto",
  },
  targetKey : "codigo"
})

module.exports = Producto;