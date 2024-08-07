const sq = require("../database/connection")
const {DataTypes} =  require("sequelize");
const Usuario = require("./Usuario");


const Permiso = sq.define('Permiso', {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    nombre : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    descripcion : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    }
},{
    timestamps : true,
    freezeTableName : true 
});


Permiso.hasMany(Usuario, {
    foreignKey : {
        allowNull : false,
        name : "fk_permiso",
    },
    sourceKey : "id"
})

Usuario.belongsTo(Permiso,{
    foreignKey : {
        name : "fk_permiso",
        allowNull : false
    },
    targetKey : "id"
})

module.exports = Permiso;