const sq = require("../database/connection");
const { DataTypes } = require("sequelize");
const DetalleCarro = require("./DetalleCarro");

const Carro = sq.define(
  "Carro",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    revisado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    fk_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    paranoid : true//Si el cliente o el admin elimina el carro queda inactivo
  }
);

Carro.hasMany(DetalleCarro, {
    foreignKey : {
        name : "fk_carro",
        allowNull : false
    },
    sourceKey : "id"
})

DetalleCarro.belongsTo(Carro, {
    foreignKey : {
        name :"fk_carro",
        allowNull : false
    },
    targetKey : "id"
})

module.exports = Carro;
