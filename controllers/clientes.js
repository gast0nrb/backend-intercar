const sq = require("../database/connection");
const Cliente = require("../models/Cliente");
const Ciudad = require("../models/Ciudad");
const Comuna = require("../models/Comuna");
const dryFn = require("../middlewares/dryFn");
const { GeneralError } = require("../utils/classErrors");

const createCliente = dryFn(async (req, res, next) => {
  const t = sq
    .transaction(async () => {
      const cliente = await Cliente.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          created: req.body,
        },
      });
      return cliente;
    })
    .catch((e) => {
      return next(e);
    });
});

const updateCliente = dryFn(async (req, res, next) => {
  const cl = await Cliente.findByPk(req.params.rut);
  if (!cl) {
    return next(
      new GeneralError(
        `No se encontró cliente con el rut (${req.params.rut})`,
        404
      )
    );
  }
  const t = sq
    .transaction(async () => {
      const cliente = await Cliente.update(req.body, {
        where: {
          rut: req.params.rut,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          updated: req.body,
        },
      });
      return cliente;
    })
    .catch((e) => {
      return next(e);
    });
});

const deleteCliente = dryFn(async (req, res, next) => {
  const cl1 = await Cliente.findByPk(req.params.rut);
  if (!cl1) {
    return next(
      new GeneralError(`No se encontró cliente con el rut (${req.params.rut})`)
    );
  }
  const t = sq
    .transaction(async () => {
      const cliente = await Cliente.destroy({
        where: {
          rut: req.params.rut,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          deleted: `Se elimino el cliente con el rut (${req.params.rut})`,
        },
      });
      return cliente;
    })
    .catch((e) => {
      return next(e);
    });
});

const getCliente = dryFn(async (req, res, next) => {
  const cliente = await Cliente.findByPk(req.params.rut);
  if (!cliente) {
    return next(
      new GeneralError(
        `No se encontró cliente con el rut (${req.params.rut})`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    data: cliente,
  });
});

const getClientes = dryFn(async (req, res, next) => {
  let obj = {};
  let query;
  //Check si hay query.limit
  if (req.query.limit) {
    obj = { limit: parseInt(req.query.limit) };
  }
  //Envia un error por enviar ambos parametros cuando solo se espera uno de los dos
  if (req.query.ciudad && req.query.comuna) {
    return next(
      new GeneralError(
        "En el request query solamente se espera o comuna o ciudad, no ambos."
      )
    );
  }
  //Check si hay query o query comuna
  if (req.query.ciudad || req.query.comuna) {
    //Check si hay query.ciudad
    if (req.query.ciudad) {
      query = await Ciudad.findAll(
        {
          where: {
            id: parseInt(req.query.ciudad),
          },
          include: [{ model: Comuna, include: Cliente }],
        },
        obj
      );
    } //Check si hay comuna query
    if (req.query.comuna) {
      query = await Cliente.findAll({
        where: {
          fk_comuna_cliente: parseInt(req.query.comuna),
        },
      });
    }
  } else {
    query = await Cliente.findAll(obj);
  }

  if (query.length == 0) {
    return next(new GeneralError("No se han encontrado clientes", 404));
  }
  res.status(200).json({
    success: true,
    len: query.length,
    data: query,
  });
});

module.exports = {
  getCliente,
  getClientes,
  updateCliente,
  deleteCliente,
  createCliente,
};
