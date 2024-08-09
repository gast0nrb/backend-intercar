const sq = require("../database/connection");
const dryFn = require("../middlewares/dryFn");
const Carro = require("../models/Carro");
const { GeneralError } = require("../utils/classErrors");

const updateCarro = dryFn(async (req, res, next) => {
  const c1 = await Carro.findByPk(req.params.id);
  if (!c1) {
    return next(
      new GeneralError(`No se encontró carro con el id (${req.params.id})`, 404)
    );
  }
  const t = sq
    .transaction(async () => {
      const carro = await Carro.update(req.params.id, {
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({
        success: true,
        data: {
          message: `Se modifico correctamente el carro con el id (${req.params.id})`,
          updated: req.body,
        },
      });
      return carro;
    })
    .catch((e) => {
      return next(e);
    });
});

const deleteCarro = dryFn(async (req, res, next) => {
  const c1 = await Carro.findByPk(req.params.id);
  if (!c1) {
    return next(
      new GeneralError(
        `No se encontró el carro con el id (${req.params.id})`,
        404
      )
    );
  }
  const t = sq
    .transaction(async () => {
      const carro = await Carro.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          message: `Se elimino el carro con el id: (${req.params.id}) correctamente`,
        },
      });
      return carro;
    })
    .catch((e) => {
      return next(e);
    });
});

const createCarro = dryFn(async (req, res, next) => {
  const t = sq
    .transaction(async () => {
      const carro = await Carro.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          message: `Se creo el carro satisfactoriamente`,
          created: req.body,
        },
      });
      return carro;
    })
    .catch((e) => {
      return next(e);
    });
});

const getCarros = dryFn(async (req, res, next) => {
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

const getCarro = dryFn(async (req, res, next) => {
  const carro = await Carro.findAll({
    where: {},
  });
});

module.exports = { getCarro, getCarros, createCarro, deleteCarro, updateCarro };
