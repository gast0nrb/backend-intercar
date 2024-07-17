const sq = require("../database/connection");
const { DataTypes } = require("sequelize");
const Ciudad = require("./Categoria");

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
    fk_ciudad : {
      type : DataTypes.INTEGER,
      allowNull : false
    }
  },
  { timestamps: false, freezeTableName: true }
);

Comuna.belongsTo(Ciudad, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = Comuna;
