const { Op } = require("sequelize");
const sq = require("../database/connection");
const dryFn = require("../middlewares/dryFn");
const Categoria = require("../models/Categoria");
const ListaPrecio = require("../models/ListaPrecio");
const ListaProducto = require("../models/ListaProducto");
const Producto = require("../models/Producto");
const HistoriaPrecio = require("../models/HistoriaPrecio");
const { GeneralError } = require("../utils/classErrors");
const qryOfertas = require("../database/querys");
const fs = require("fs");

const deletePhoto = dryFn(async (req, res, next) => {
  const producto = await Producto.findByPk(req.params.codigo);
  if (!producto) {
    return next(
      new GeneralError(
        "No existe producto con el codigo indicado : (" +
          req.params.codigo +
          ")",
        404
      )
    );
  }
  const filepath = producto.file;
  fs.unlink(filepath, (err) => {
    if (err) {
      return next(
        new GeneralError(
          `Problemas al eliminar la imagen con ruta (${filepath})`
        )
      );
    }
  });
  const t = sq
    .transaction(async (t) => {
      const p1 = await Producto.update(
        { file: "" },
        { where: { codigo: req.params.codigo } }
      );
      console.log(filepath);
      res.status(200).json({
        success: true,
        data: {
          message: `Se eliino la imagen con ruta (${filepath}) correctamente`,
        },
      });
      return t;
    })
    .catch((e) => next(e));
});

//Solamente puede ser llamada si el producto ya existe.
const postPhoto = dryFn(async (req, res, next) => {
  const t = sq
    .transaction(async () => {
      const p1 = await Producto.update(
        { file: req.file.destination + req.file.filename },
        {
          where: {
            codigo: req.params.codigo,
          },
        }
      );
      res.status(200).json({
        success: true,
        data: {
          message: "Se grabo correctamente el archivo indicado.",
        },
      });
      return t;
    })
    .catch((e) => {
      return next(e);
    });
});

const getOfertas = dryFn(async (req, res, next) => {
  const ofertas = await sq.query(qryOfertas, {
    nest: true,
  });
  res.status(200).json({
    success: true,
    len: ofertas.length,
    data: ofertas,
  });
});

const getProductos = dryFn(async (req, res, next) => {
  let whereObj = {};
  if (Object.keys(req.query).length > 1) {
    return next(
      new GeneralError(
        "El método solamente espera 1 parametro en el query, pueden ser (categoria,text,fecha), pero no mas de uno.",
        400
      )
    );
  }
  if (req.query.categoria) {
    whereObj = {
      where: {
        fk_categoria_producto: req.query.categoria,
      },
    };
  }
  if (req.query.text) {
    whereObj = {
      where: {
        [Op.or]: {
          titulo: { [Op.like]: `%${req.query.text}%` },
          codigo: { [Op.like]: `%${req.query.text}%` },
          descripcion: { [Op.like]: `%${req.query.text}%` },
        },
      },
    };
  }
  const { where } = whereObj; //Deconstruimos la propiedad where para pasarla directamente
  const p = await Producto.findAll({
    where,
    include: [
      { model: Categoria },
      { model: ListaProducto, include: ListaPrecio },
    ],
    order: [["titulo", "ASC"]],
  });
  res.status(200).json({
    success: true,
    data: p,
  });
});

const createProducto = dryFn(async (req, res, next) => {
  const t = sq
    .transaction(async () => {
      const p1 = await Producto.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          message: `Creado correctamente el producto con el código : (${req.body.codigo})`,
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
          message: `modificado el producto con el codigo : (${req.params.codigo})`,
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
          message: `Eliminado el producto con el código (${req.params.codigo})`,
        },
      });
      return p1;
    })
    .catch((e) => {
      return next(e);
    });
});

const getProducto = dryFn(async (req, res, next) => {
  const producto = await Producto.findByPk(req.params.codigo, {
    include: [
      { model: Categoria },
      { model: ListaProducto, include: ListaPrecio },
    ],
  });
  if (!producto) {
    return next(
      new GeneralError(
        `No existe producto con el código : (${req.params.codigo})`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: {
      len: producto.length,
      producto,
    },
  });
});

module.exports = {
  deleteProducto,
  createProducto,
  updateProducto,
  getProductos,
  getProducto,
  getOfertas,
  postPhoto,
  deletePhoto,
};
