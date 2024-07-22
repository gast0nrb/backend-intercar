const sq = require("../database/connection");
const { DataTypes } = require("sequelize");
const Producto = require("./Producto")

const Categoria = sq.define(
  "CATEGORIA",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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

Categoria.hasMany(Producto, {
  foreignKey : {
    allowNull : false, 
    name : "fk_categoria_producto",
  }
})

Producto.belongsTo(Categoria, {
  foreignKey : {
    allowNull : false,
    name : "fk_categoria_producto"
  }
})

module.exports = Categoria;
