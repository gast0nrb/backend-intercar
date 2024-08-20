const sq = require("../database/connection")
const {DataTypes} =  require("sequelize")
const bcryp = require("bcrypt")

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

Usuario.beforeCreate(async function(user, options){
    const salt = await bcryp.genSalt(10)
    const hash = await bcryp.hash(user.passwd, salt)
    user.passwd =  hash
})

module.exports = Usuario;