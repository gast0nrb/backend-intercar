const sq = require("../database/connection");
const dryFn = require("../middlewares/dryFn");
const Producto = require("../models/Producto");
const GeneralError = require("../utils/classErrors");

const createProducto = dryFn(async (req, res, next) => {
  const t = sq
    .transaction(async () => {
      const p1 = await Producto.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          message: `Creado correctamente el producto con el código : (${req.params.codigo})`,
          created: req.body,
        },
      });
      return p1;
    })
    .catch((e) => {
      return next(e);
    });
});

const updateProducto = dryFn(async (req, res, next) => {
  const productoValidate = await Producto.findByPk(req.params.codigo);
  if (!productoValidate) {
    return next(
      new GeneralError(
        `No existe producto con el código: (${req.params.codigo})`,
        404
      )
    );
  }
  const t = sq
    .transaction(async () => {
      const p1 = await Producto.update(req.body, {
        where: {
          codigo: req.params.codigo,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          message: `modificado el producto con el codigo : (${req.params.id})`,
          updated: req.body,
        },
      });
      return p1;
    })
    .catch((e) => {
      return next(e);
    });
});

const deleteProducto = dryFn(async (req, res, next) => {
  const productoValidate = await Producto.findByPk(req.params.codigo);
  if (!productoValidate) {
    return next(
      new GeneralError(
        `No existe producto con el código: (${req.params.codigo})`,
        404
      )
    );
  }
  const t = sq
    .transaction(async () => {
      const p1 = await Producto.destroy({
        where: {
          codigo: req.params.codigo,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          message: `Eliminado el producto con el código (${req.body.codigo})`,
        },
      });
      return p1;
    })
    .catch((e) => {
      return next(e);
    });
});
