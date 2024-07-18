const sq = require("../database/connection");
const { DataTypes } = require("sequelize");
const Ciudad = require("./Categoria");
const Sucursal = require("./Sucursal");

const Comuna = sq.define(
  "COMUNA",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

Comuna.hasMany(Sucursal, {
  foreignKey : {
    name : "fk_comuna_sucursal",
    allowNull : false, 
  },
})

Sucursal.belongsTo(Comuna, {
  foreignKey : {
    name : "fk_comuna_sucursal",
    allowNull : false
  },
})


module.exports = Comuna;
