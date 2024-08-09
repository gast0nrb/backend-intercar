const dryFn = require("../middlewares/dryFn");
const { GeneralError } = require("../utils/classErrors");
const DetalleCarro = require("../models/DetalleCarro");
const sq = require("../database/connection");

const createDetalleCarro = dryFn(async (req, res, next) => {
  const t = sq
    .transaction(async () => {
      const htc = await DetalleCarro.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          message: `Producto agregado al carro correctamente`,
          created: req.body,
        },
      });
      return htc;
    })
    .catch((e) => {
      return next(e);
    });
});

const updateDetalleCarro = dryFn(async (req, res, next) => {
  const dc1 = await DetalleCarro.findAll({
    where: {
      fk_carro: req.params.carro,
      fk_producto: req.params.producto,
    },
  });
  if (dc1.length == 0)
    return next(
      new GeneralError(
        `No se encontró movimiento datos asociados al carro (${req.params.carro}) con el código (${req.params.codigo})`,
        404
      )
    );
  const t = sq
    .transaction(async () => {
      const dcarro = await DetalleCarro.update(req.body, {
        where: {
          fk_carro: req.params.carro,
          fk_producto: req.params.producto,
        },
      });

      res.status(200).json({
        success: true,
        data: {
          message: `Se modifico el producto con el código (${req.params.producto}) en el carro con id (${req.params.carro}) correctamente`,
        },
      });
      return dcarro;
    })
    .catch((e) => next(e));
});
module.exports = {
  createDetalleCarro,
  updateDetalleCarro,
};
