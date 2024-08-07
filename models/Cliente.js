const sq = require("../database/connection");
const { DataTypes } = require("sequelize");
const Carro = require("./Carro");
const Usuario = require("./Usuario");

const Cliente = sq.define(
  "Cliente",
  {
    rut: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        len: [8, 9],
      },
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    razon_social: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        len: 9,
      },
    },
    telefono2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    giro: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true, timestamps: false }
);

Cliente.hasMany(Carro, {
  foreignKey: {
    name: "fk_cliente",
    allowNull: false,
  },
  sourceKey: "rut",
});

Carro.belongsTo(Cliente, {
  foreignKey: {
    name: "fk_cliente",
    allowNull: false,
  },
  targetKey: "rut",
});

Cliente.hasMany(Usuario, {
  foreignKey : {
    name : "fk_cliente_usuario",
    allowNull : true
  },
  sourceKey : "rut"
})

Usuario.belongsTo(Cliente, {
  foreignKey : {
    name : "fk_cliente_usuario",
    allowNull : true
  },
  targetKey : "rut"
})



module.exports = Cliente;
