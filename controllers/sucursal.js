const dryFn = require("../middlewares/dryFn");
const Sucursal = require("../models/Sucursal");
const { GeneralError } = require("../utils/classErrors");
const sq = require("../database/connection")

const createSucursal = dryFn(async(req, res, next) => {
   sq.transaction(async()=> {
        const sucursal = await Sucursal.create(req.body);
   }) .catch((err)=> {
    return next(err)
   })
});

const deleteSucursal = dryFn(async(req, res, next) => {

})

const updateSucursal = dryFn(async(req, res, next) => {

})

const getSucursales = dryFn(async(req, res, next) => {
    const sucursales = await Sucursal.findAll();
    if (sucursales.length == 0) {
        return next(new GeneralError("No se han encontrado sucursales", 404));
    }
    res.status(200).json({
        success : true , 
        data : sucursales
    })
});


module.exports = {
    createSucursal,
    deleteSucursal, 
    getSucursales, 
    updateSucursal 
};