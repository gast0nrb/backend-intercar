const sq = require("../database/connection");
const { DataTypes } = require("sequelize");
const Comuna = require("./Comuna");

// registros creados desde la base de datos
const Ciudad = sq.define(
  "CIUDAD",
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
    },
  },
  { timestamps: false, freezeTableName: true }
);

Ciudad.hasMany(Comuna, {
  foreignKey: {
    allowNull: false,
    name: "fk_ciudad",
  },
  sourceKey: "id",
});

Comuna.belongsTo(Ciudad, {
  foreignKey: {
    allowNull: false,
    name: "fk_ciudad",
  },
});

module.exports = Ciudad;
