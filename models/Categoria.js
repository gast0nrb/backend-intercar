const sq = require("../database/connection")
const {DataTypes} = require("sequelize")

const Categoria = sq.define(
    'CATEGORIA',
    {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
    nombre : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
    }
    },{
        timestamps : false,
    },
)

Categoria.addHook('beforeValidate', 'clg values', (user, options )=> {
    console.log(user)
})


module.exports = Categoria;