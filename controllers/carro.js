const sq = require("../database/connection");
const dryFn = require("../middlewares/dryFn");
const Carro = require("../models/Carro");
const { GeneralError } = require("../utils/classErrors");

const getCarros = dryFn(async (req, res, next) => {
  const carros = await Carro.findAll({
    where: {
      fk_cliente: req.params.rut,
    },
  });
  if (carros.length == 0) {
    return next(
      new GeneralError(
        `No se encontrarón carros para el rut especificado : (${req.params.rut})`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    len: carros.length,
    data: carros,
  });
});

const getCarro = dryFn(async(req, res, next)=> {
    const carro = await Carro.findAll({
        where : {
            
        }
    })
})

