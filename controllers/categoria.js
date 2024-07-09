const Categoria = require("../models/Categoria");
const sq = require("../database/connection");
const colors = require("colors");
const { BadRequest, NotFound, GeneralError } = require("../utils/classErrors");
const dryFn = require("../middlewares/dryFn");

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
  const t = await sq.transaction();
  if (!req.body.nombre) {
    return next(
      new GeneralError(`No se especifico el campo "nombre" para realizar el update`, 400)
    );
  }
  const categoria = await Categoria.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  await t.commit();
  res.status(200).json({
    success : true,
    data : {
      updated : {
        nombre : req.body.nombre
      }
    }
  })
});

module.exports = {
  listCategorias,
  createCategorias,
  updateCategoria,
};
