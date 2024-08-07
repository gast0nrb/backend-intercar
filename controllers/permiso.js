const sq = require("../database/connection");
const { GeneralError } = require("../utils/classErrors");
const Permiso = require("../models/Permiso");
const dryFn = require("..//middlewares/dryFn");

const createPermiso = dryFn(async (req, res, next) => {
  const t = sq
    .transaction(async () => {
      const permiso = await Permiso.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          message: `Creado el permiso con el nombre (${req.body.nombre})`,
          created: req.body,
        },
      });
      return permiso;
    })
    .catch((e) => next(e));
});

const updatePermiso = dryFn(async (req, res, next) => {
  const p1 = await Permiso.findByPk(req.params.id);
  if (!p1)
    return next(
      new GeneralError(
        `No se encontró permiso con el id (${req.params.id})`,
        404
      )
    );
  const t = sq
    .transaction(async () => {
      const permiso = await Permiso.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          message: `Modificado correctamnete el permiso con el id (${req.params.id})`,
          updated: req.body,
        },
      });
      return permiso;
    })
    .catch((e) => next(e));
});

const deletePermiso = dryFn(async () => {
  const p1 = await Permiso.findByPk(req.params.id);
  if (!p1)
    return next(
      new GeneralError(
        `No se encontró permis con el id (${req.params.id})`,
        404
      )
    );
  const t = sq
    .transaction(async () => {
      const permiso = await Permiso.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          message: `Se elimino el permiso con el id (${req.params.id}) satisfactoriamente`,
        },
      });
      return permiso;
    })
    .catch((e) => next(e));
});

const getPermisos = dryFn(async () => {
  const permisos = await Permiso.findAll();

  if (permisos.length == 0)
    return next(new GeneralError(`No existen permisos creados`, 404));

  res.status(200).json({
    success: true,
    length: permisos.length,
    data: permisos,
  });
});

module.exports = {
  getPermisos,
  createPermiso,
  deletePermiso,
  updatePermiso,
};
