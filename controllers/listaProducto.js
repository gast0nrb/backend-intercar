const sq = require("../database/connection");
const dryFn = require("../middlewares/dryFn");
const ListaProducto = require("../models/ListaProducto");

const createPrecio = dryFn(async (req, res, next) => {
  const t = sq
    .transaction(async () => {
      const lpt = await ListaProducto.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          message: `Precio creado correctamente`,
          created: req.body,
        },
      });
      return lpt;
    })
    .catch((e) => {
      return next(e);
    });
});

const updatePrecio = dryFn(async (req, res, next) => {
  const lpt1 = await ListaProducto.findByPk(
    req.params.producto,
    req.params.lista
  );
  if (!lpt1) {
    return next(
      new GeneralError(
        `No se encontró producto con el código (${req.params.codigo}) correspondiente a la lista (${req.params.lista})`,
        404
      )
    );
  }
  const t = sq.transaction(async () => {
    const lpt = await ListaProducto.update(req.body, {
      where: {
        fk_producto: req.params.producto,
        fk_lista: req.params.lista,
      },
    });
    res.status(200).json({
      success: true,
      data: {
        message: `Se modifico el precio del producto con código (${req.params.codigo}), correspondiente a la lista : (${req.params.lista})`,
        updated: req.body,
      },
    });
  });
});

module.exports = {
  updatePrecio,
  createPrecio,
};
