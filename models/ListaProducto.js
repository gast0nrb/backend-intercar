const sq = require("../database/connection")
const {DataTypes} = require("sequelize")
const HistoriaPrecio = require("./HistoriaPrecio")

const ListaProducto = sq.define('ListaProducto', {
     fk_producto : {
        type : DataTypes.STRING,
        allowNull : false, 
        primaryKey : true
     },
     fk_lista : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true
    },
    monto : {
        type : DataTypes.INTEGER,
        allowNull : false, 
    },
    cantidad_min : {
        type : DataTypes.INTEGER,
        allowNull : false,
        defaultValue : 1
    },
    descuento : {
        type : DataTypes.INTEGER,
        allowNull :  true,
        defaultValue : 0,
        validate : {
        min : 0,
        max : 99
        }
    },
},{timestamps : true,
})

ListaProducto.addHook('beforeUpdate', (listP, options)=> {
    console.log("hello from here")
})
    
module.exports = ListaProducto;