const Categoria = require("../models/Categoria");
const Producto = require("../models/Producto");
const ListaPrecio = require("../models/ListaPrecio");
const sq = require("../database/connection");
const { GeneralError } = require("../utils/classErrors");
const dryFn = require("../middlewares/dryFn");
const ListaProducto = require("../models/ListaProducto");

const getProductosByCategoria = dryFn(async (req, res, next) => {
  const productos = await Categoria.findByPk(req.params.id, {
    include : [{model : Producto,  include : {model : ListaProducto, include : ListaPrecio}}],
  });

  if (!productos) {
    return next(
      new GeneralError(`No existe la categoría con id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    len: productos.Productos.length,
    data: productos,
  });
});

//puede recibir un limit
const listCategorias = dryFn(async (req, res, next) => {
  let queryParams = {
    order: [["id", "ASC"]],
  };
  if (req.query.limit) {
    queryParams = { ...queryParams, limit: parseInt(req.query.limit) };
  }

  const categorias = await Categoria.findAll(queryParams);
  res.status(200).json({
    success: true,
    len: categorias.length,
    data: categorias,
  });
});

const createCategorias = dryFn(async (req, res, next) => {
  const t = sq
    .transaction(async () => {
      const categoria = await Categoria.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          message: `Categoría (${req.body.nombre}) creada correctamente`,
          created: req.body,
        },
      });
      return categoria;
    })
    .catch((error) => {
      return next(error);
    });
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
  const t = sq
    .transaction(async () => {
      //Quizá se puede hacer vía hooks
      const categoria = await Categoria.update(req.body, {
        where: { id: req.params.id },
      });

      res.status(200).json({
        success: true,
        data: {
          message: `Modificada la categoría con el id : (${req.params.id})`,
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
  const t = sq
    .transaction(async () => {
      const findCategoria = await Categoria.findByPk(req.params.id);
      if (!findCategoria) {
        return next(
          new GeneralError(
            `No se encontró categoría con el id ${req.params.id}`,
            400
          )
        );
      }
      const categoria = await Categoria.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          message: `Categoria con el id : ${req.params.id} eliminado`,
        },
      });

      return categoria;
    })
    .catch((e) => {
      return next(e);
    });
});

module.exports = {
  listCategorias,
  createCategorias,
  updateCategoria,
  deleteCategoria,
  getProductosByCategoria,
};
