const dryFn = require("../middlewares/dryFn");
const Sucursal = require("../models/Sucursal");
const Comuna = require("../models/Comuna")
const Ciudad = require("../models/Ciudad")
const { GeneralError } = require("../utils/classErrors");
const sq = require("../database/connection");

const createSucursal = dryFn(async (req, res, next) => {
  const t = sq
    .transaction(async () => {
      const sucursal = await Sucursal.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          message: `Creada correctamente la sucursal (${req.body.nombre})`,
          created: req.body,
        },
      });
      return sucursal;
    })
    .catch((err) => {
      return next(err);
    });
});

const deleteSucursal = dryFn(async (req, res, next) => {
  const s1 = await Sucursal.findByPk(req.params.id);
  if (!s1) {
    return next(
      new GeneralError(`No se encontró sucursal con el id (${req.params.id})`)
    );
  }
  const t = sq.transaction(async () => {
    const sucursal = await Sucursal.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      success: true,
      data: {
        message: `Eliminada la sucursal con id ${req.params.id}`,
      },
    });
    return sucursal;
  });
});

const updateSucursal = dryFn(async (req, res, next) => {
  const s1 = await Sucursal.findByPk(req.params.id);
  if (!s1) {
    return next(
      new GeneralError(`No se encontró sucursal con la id (${req.params.id})`)
    );
  }
  const t = sq
    .transaction(async () => {
      const sucursal = await Sucursal.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          message: `Modificada la sucursal con el id : (${req.params.id})`,
          updated: req.body,
        },
      });
      return sucursal;
    })
    .catch((e) => {
      return next(e);
    });
});

const getSucursal = dryFn(async (req, res, next) => {
  const sucursal = await Sucursal.findByPk(req.params.id);
  if (!sucursal) {
    return next(
      new GeneralError(
        `No se encontró sucursal con el id ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    data: sucursal,
  });
});

const getSucursales = dryFn(async (req, res, next) => {
  const sucursales = await Sucursal.findAll({include : {model : Comuna, include : Ciudad }});
  if (sucursales.length == 0) {
    return next(new GeneralError("No se han encontrado sucursales", 404));
  }
  res.status(200).json({
    success: true,
    len: sucursales.length,
    data: sucursales,
  });
});

module.exports = {
  createSucursal,
  deleteSucursal,
  getSucursales,
  updateSucursal,
  getSucursal,
};
