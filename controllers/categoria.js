const Categoria = require("../models/Categoria");
const sq = require("../database/connection");
const colors = require("colors");
const { BadRequest, NotFound, GeneralError } = require("../utils/classErrors");
const dryFn = require("../middlewares/dryFn");
const { where } = require("sequelize");

const listCategorias = dryFn(async (req, res, next) => {
  const categorias = await Categoria.findAll();
  res.status(200).json({
    success: true,
    data: {
      categorias,
    },
  });
});

const createCategorias = dryFn(async (req, res, next) => {
  const t = await sq.transaction();
  const categoria = await Categoria.create(req.body);
  await t.commit();
});

const updateCategoria = dryFn(async (req, res, next) => {
  if (!req.body.hasOwnProperty("nombre")) {
    return next(
      new GeneralError(
        "No hay datos entregados, revisa si la propiedad 'nombre' existe en el json enviado a la api."
      )
    );
  }
  //Valida si es que hay alguna categoria en la bd con el id pasado por parametro
  const dbCategoria = await Categoria.findByPk(req.params.id);
  if (!dbCategoria) {
    return next(
      new GeneralError("No existe categoría con el id especificado", 404)
    );
  }
  if(dbCategoria.nombre == req.body.nombre) {
    return next(
      new GeneralError(`El valor de la propiedad 'NOMBRE' en la categoría con id '${req.params.id}' ya es '${req.body.nombre}'`, 400)
    )
  }
  const t = sq
    .transaction(async () => {
      //Quizá se puede hacer vía hooks
      const categoria = await Categoria.update(req.body, {
        where: { id: req.params.id },
      });

      res.status(200).json({
        success: true,
        data: {
          updated: req.body,
        },
      });
      return categoria;
    })
    .catch((e) => {
      return next(e);
    });
});

const deleteCategoria = dryFn(async (req, res, next) => {
  const t = await sq.transaction();
  const categoria = await Categoria.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!categoria) {
    t.rollback();
    return next(
      new GeneralError(
        "No se encontró categoría con el id : " + req.params.id,
        404
      )
    );
  }

  t.commit();

  res.status(200).json({
    success: true,
    data: {
      deleted: `categoria con el id "${req.params.id}" eliminada`,
    },
  });
});

module.exports = {
  listCategorias,
  createCategorias,
  updateCategoria,
  deleteCategoria,
};
