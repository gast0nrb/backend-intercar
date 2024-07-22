const sq = require("../database/connection");
const ListaPrecio = require("../models/ListaPrecio");
const dryFn = require("../middlewares/dryFn");
const {GeneralError} = require("../utils/classErrors");

const createListaPrecio = dryFn(async (req, res, next) => {
  const t = sq
    .transaction(async () => {
      const lp = await ListaPrecio.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          created: req.body,
        },
      });
      return lp;
    })
    .catch((e) => {
      return next(e);
    });
});

const deleteListaPrecio = dryFn(async (req, res, next) => {
  const lp1 = await ListaPrecio.findByPk(req.params.id);
  if (!lp1) {
    return next(
      new GeneralError(
        `No se encontró lista de precio con el id : (${req.params.id})`,
        404
      )
    );
  }
  const t = sq
    .transaction(async () => {
      const lp = await ListaPrecio.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          deleted: `Eliminada lista precio con el id (${req.params.id})`,
        },
      });
      return lp;
    })
    .catch((e) => {
      return next(e);
    });
});

const updateListaPrecio = dryFn(async (req, res, next) => {
  const lp1 = await ListaPrecio.findByPk(req.params.id);
  if (!lp1) {
    return next(
      new GeneralError(
        `No se encontró lista de precio con el id : (${req.params.id})`,
        404
      )
    );
  }
  const t = sq
    .transaction(async () => {
      const lp = await ListaPrecio.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          message: `Modificada lista precio con el id (${req.params.id})`,
          modified : req.body
        },
      });
      return lp;
    })
    .catch((e) => {
      return next(e);
    });
});

const getListasPrecio = dryFn(async (req, res, next) => {
  const lp = await ListaPrecio.findAll();
  if(lp.length == 0) {
    return next(new GeneralError(`No se encontraron listas de precio`, 404))
}
  res.status(200).json({
    success: true,
    len: lp.length,
    data: lp,
  });
});

module.exports = {
  getListasPrecio,
  updateListaPrecio,
  deleteListaPrecio,
  createListaPrecio,
};
