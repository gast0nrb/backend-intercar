const sq = require("../database/connection");
const {DataTypes} = require("sequelize")

const Sucursal = sq.define('Sucursal', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    nombre : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false, 
        validate : {
            notEmpty : true
        }
    },
    urlWaze : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false,
        validate : {
            notEmpty : true
        }
        
    },
    urlMaps : {
        type : DataTypes.STRING,
        unique : true, 
        allowNull : false, 
        validate : {
            notEmpty : true
        }
    },
    direccion : {
        type : DataTypes.STRING,
        unique : true, 
        allowNull : false, 
        validate : {
            notEmpty : true
        }
    },
    foto_url : {
        type : DataTypes.STRING,
        defaultValue : '/defaultSucursal.png',
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
}, {
    timestamps : false, 
    freezeTableName : true
});


module.exports = Sucursal;