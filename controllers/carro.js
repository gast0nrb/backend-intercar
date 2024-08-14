const sq = require("../database/connection");
const dryFn = require("../middlewares/dryFn");
const Carro = require("../models/Carro");
const HistoriaCarro = require("../models/HistoriaCarro")
const DetalleCarro = require("../models/DetalleCarro");
const { GeneralError } = require("../utils/classErrors");

const updateCarro = dryFn(async (req, res, next) => {
  const c1 = await Carro.findByPk(req.params.id);
  if (!c1) {
    return next(
      new GeneralError(`No se encontró carro con el id (${req.params.id})`, 404)
    );
  }
  const t = sq
    .transaction(async () => {
      const carro = await Carro.update(req.params.id, {
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({
        success: true,
        data: {
          message: `Se modifico correctamente el carro con el id (${req.params.id})`,
          updated: req.body,
        },
      });
      return carro;
    })
    .catch((e) => {
      return next(e);
    });
});

const deleteCarro = dryFn(async (req, res, next) => {
  const c1 = await Carro.findByPk(req.params.id);
  if (!c1) {
    return next(
      new GeneralError(
        `No se encontró el carro con el id (${req.params.id})`,
        404
      )
    );
  }
  const t = sq
    .transaction(async () => {
      const carro = await Carro.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          message: `Se elimino el carro con el id: (${req.params.id}) correctamente`,
        },
      });
      return carro;
    })
    .catch((e) => {
      return next(e);
    });
});

const createCarro = dryFn(async (req, res, next) => {
  const t = sq
    .transaction(async () => {
      const carro = await Carro.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          message: `Se creo el carro satisfactoriamente`,
          created: req.body,
        },
      });
      return carro;
    })
    .catch((e) => {
      return next(e);
    });
});

const getCarros = dryFn(async (req, res, next) => {
  let queryWhere = "";
  if (req.query.rut) {
    queryWhere = ` where cr.fk_cliente = '${req.query.rut}' `;
  }

  const carros = await sq.query(
    `
  SELECT sum((dc.monto * dc.cantidad)) as 'Monto total carro',
  dc.fk_carro, count(id) as 'Cantidad productos',
  cr.createdAt,
  cr.revisado,
  cr.fk_cliente
  from DetalleCarro dc 
  join Carro cr
  on cr.id = dc.fk_carro 
  ${queryWhere}
  group by dc.fk_carro 
  `,
    { nest: true }
  );
  if (carros.length == 0 && req.query.rut) {
    return next(
      new GeneralError(
        `No se encontrarón carros asociados al rut (${req.query.rut})`
      )
    );
  }

  res.status(200).json({
    success: true,
    len: carros.length,
    data: carros,
  });
});

const getCarro = dryFn(async (req, res, next) => {
  const carro = await Carro.findAll({
    where: {
      id: req.params.id,
    },
    include: [{ model: DetalleCarro }],
  });

  const historiaCarro = await HistoriaCarro.findAll({where : {
    fk_carro : req.params.id
  }}) 

  if (!carro) {
    return next(
      new GeneralError(
        `No se encontró un carro con el id (${req.params.id})`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    len: carro.length,
    data: {
      carro,
      historiaCarro
    },
  });
});

module.exports = { getCarro, getCarros, createCarro, deleteCarro, updateCarro };
