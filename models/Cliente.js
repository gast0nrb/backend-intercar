const sq = require("../database/connection")
const {DataTypes} = require("sequelize")


const Cliente = sq.define('Cliente', {
    rut : {
        type : DataTypes.STRING,
        primaryKey : true, 
        allowNull : false,
        validate : {
            len : [8,9]
        }
    },
    nombre : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    razon_social : {
        type : DataTypes.STRING,
        allowNull : true,
        defaultValue : ""
    },
    telefono : {
        type : DataTypes.INTEGER,
        allowNull : false,
        unique : true,
        validate  : {
            len : 9
        },   
    },
    telefono2 : {
        type : DataTypes.INTEGER,
        allowNull : true,
        defaultValue : 0,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
        //Agregar regex validadora
    },
    hash : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    aceptado : {
        type : DataTypes.BOOLEAN,
        defaultValue : false,
        allowNull : true
    },
    giro : {
        type : DataTypes.STRING,
        defaultValue : "",
        allowNull : true
    },
    direccion : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true,
        }
    }
}, {freezeTableName : true, timestamps : false})


module.exports = Cliente