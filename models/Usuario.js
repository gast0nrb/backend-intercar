const sq = require("../database/connection")
const {DataTypes} =  require("sequelize")

const Usuario = sq.define('Usuario',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true, 
        primaryKey : true, 
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : true,
        unique : true,
        validate : {
            isEmail : true
        }
    },
    aceptado : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
    },
    passwd : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    fk_permiso :{
        type : DataTypes.INTEGER,
        allowNull : false
    },
    fk_cliente_usuario  :{
        type : DataTypes.STRING,
        allowNull : true
    }
}, {
    timestamps : true, 
    freezeTableName : true,
    paranoid : true
});


module.exports = Usuario;