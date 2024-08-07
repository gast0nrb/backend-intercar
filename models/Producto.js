const sq = require("../database/connection");
const { DataTypes } = require("sequelize");
const ListaProducto = require("./ListaProducto");
const DetalleCarro = require("./DetalleCarro");

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
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "/defaultImage.png",
    },
    barra: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

Producto.hasMany(ListaProducto, {
  foreignKey: {
    allowNull: false,
    name: "fk_producto",
  },
  sourceKey: "codigo",
});

ListaProducto.belongsTo(Producto, {
  foreignKey: {
    allowNull: false,
    name: "fk_producto",
  },
  targetKey: "codigo",
});

Producto.hasMany(DetalleCarro, {
  foreignKey: {
    name: "fk_producto",
    allowNull: false,
  },
  sourceKey: "codigo",
});

DetalleCarro.belongsTo(Producto, {
  foreignKey: {
    name: "fk_producto",
    allowNull: false,
  },
});

module.exports = Producto;
