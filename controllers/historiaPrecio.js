const HistoriaPrecio =  require("../models/HistoriaPrecio");
const dryFn = require("../middlewares/dryFn");
const { GeneralError } = require("../utils/classErrors");



const getHistoriales = dryFn(async(req, res, next)=> {
    let whereObj = {}
    if(req.query.codigo) {
        whereObj = {
            where : {
                fk_producto : parseInt(req.query.codigo)
            }
        }
    }
    const historia = await HistoriaPrecio.findAll(whereObj);

    if(historia.length == 0 ) {
        return next(new GeneralError("No se encontró historial", 404))
    }

    res.status(200).json({
        success : true, 
        len : historia.length,
        data : historia
    })
});


module.exports = {getHistoriales} ;