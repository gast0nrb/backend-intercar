const HistoriaCarro = require("../models/HistoriaCarro");
const dryFn = require("../middlewares/dryFn");
const { GeneralError } = require("../utils/classErrors");

const getHistoriaCarro = dryFn(async (req, res, next) => {
  const hcarro = await HistoriaCarro.findAll({
    where: {
      fk_carro: req.params.id,
    },
  });
  if (hcarro.length == 0)
    next(
      new GeneralError(
        `No se encontró historial para el carro con el id (${req.params.id})`,
        404
      )
    );

  res.status(200).json({
    success: true,
    len: hcarro.length,
    data: hcarro,
  });
});

module.exports = {getHistoriaCarro}
