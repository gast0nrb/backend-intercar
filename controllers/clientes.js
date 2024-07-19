const sq = require("../database/connection");
const Cliente = require("../models/Cliente");
const Ciudad = require("../models/Ciudad")
const Comuna = require("../models/Comuna")
const dryFn = require("../middlewares/dryFn")
const {GeneralError} = require("../utils/classErrors")

const createCliente = dryFn(async(req, res, next) => {
    const t = sq.transaction(async()=> {
        const cliente = await Cliente.create(req.body);
        res.status(201).json({
            success : true, 
            data :  {
                created : req.body
            }
        })
        return cliente
    }).catch((e)=> {
        return next(e)
    })
});

const updateCliente  = dryFn(async(req, res ,next) => {
    const cl = await Cliente.findByPk(req.params.id);
    if(!cl) {
        return next(new GeneralError(`No se encontró cliente con el rut (${req.params.rut})`, 404))
    }
    const t = sq.transaction(async()=> {
        const cliente = await Cliente.update(req.body,  {
            where : {
                rut : req.params.rut
            }
        })
        res.status(200).json({
            success : true, 
            data :  {
                updated : req.body
            }
        })
        return cliente
    }).catch((e)=> {
        return next(e)
    })
});

const deleteCliente = dryFn(async(req, res, next)=> {
    const cl1 = await Cliente.findByPk(req.params.rut);
    if(!cl1) {
        return next(new GeneralError(`No se encontró cliente con el rut (${req.params.rut})`))
    }
   const t = sq.transaction(async()=> {
        const cliente = await Cliente.destroy({where : {
            rut : req.params.rut
        }});
        res.status(200).json({
            success : true, 
            data : {
                deleted : `Se elimino el cliente con el rut (${req.params.rut})`
            }
        })
      return cliente  
    }).catch((e)=> {
        return next(e)
    })
});

const getCliente = dryFn(async(req, res, next) => {
    const cliente = await Cliente.findByPk(req.params.rut);
    if(!cliente) {
        return next(new GeneralError(`No se encontró cliente con el rut (${req.params.rut})`, 404))
    }
    res.status(200).json({
        success : true, 
        data : cliente
    })
});

const getClientes = dryFn(async(req, res, next) => {
    let obj = {};
    if(req.query.limit) {
        obj = {limit : parseInt(req.query.limit)}
    }
    if(req.query.ciudad) {
        
    }
    if(req.query.comuna) {
        if(req.query.ciudad) {
            return next(new GeneralError("Si desea filtrar por comunas, debe dar el id de la ciudad además del id de la comuna.", 400))
        }
    }
    const clientes = await Cliente.findAll({
        
    });
    if(clientes.length == 0) {
        return next(new GeneralError("No se han encontrado clientes", 404))
    }
    res.status(200).json({
        success : true, 
        len : clientes.length,
        data :clientes
    })
});


module.exports = {
    getCliente, getClientes,
    updateCliente, deleteCliente,
    createCliente
}