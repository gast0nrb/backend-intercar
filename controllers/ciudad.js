const Ciudad = require("../models/Ciudad");
const dryFn = require("../middlewares/dryFn");
const { GeneralError } = require("../utils/classErrors");
const Comuna = require("../models/Comuna");

const getCiudades = dryFn(async (req, res, next) => {
  const ciudades = await Ciudad.findAll();
  if (ciudades.length == 0) {
    return next(
      new GeneralError(
        "No se encontraron valores para las ciudades en la base de datos",
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    len: ciudades.length,
    data: ciudades,
  });
});

const getComunasByCiudades = dryFn(async (req, res, next) => {
  const comunas = await Comuna.findAll({
    where: {
      fk_ciudad_comuna: req.params.id,
    },
  });
  if (comunas.length == 0) {
    return next(
      new GeneralError(
        `No se encontraron comunas asociadas al fk ${req.params.id} de ciudades`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    len: comunas.length,
    data: comunas,
  });
});

module.exports = { getCiudades, getComunasByCiudades };
