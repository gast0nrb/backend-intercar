const { GeneralError } = require("../utils/classErrors");
const dryFn = require("../middlewares/dryFn");
const sq = require("../database/connection");
const Usuario = require("../models/Usuario");
const generateToken = require("../utils/generateToken");
const comparePass = require("../utils/auth");

const authUser = dryFn(async (req, res, next) => {
  const u1 = await Usuario.findOne({ where: { email: req.body.email } });

  if (!u1 || !await comparePass(req.body.passwd, u1.passwd)) {
    return next(new GeneralError("Correo o contraseña invalida", 401));
  }

  generateToken(res, u1.nombre);
  res.status(200).json({
    success: true,
    data: {
      message: "Log correctamente",
    },
  });
});

const createUser = dryFn(async (req, res, next) => {
  const u1 = await Usuario.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (u1) {
    return next(
      new GeneralError(`El correo ingresado ya tiene un usuario asociado`, 400)
    );
  }

  const t = sq
    .transaction(async () => {
      const user = await Usuario.create(req.body);
      generateToken(res, req.body.nombre);
      res.status(201).json({
        success: true,
        data: {
          message: `Creado el usuario con el email : (${req.body.email})`,
          created: {
            email: req.body.email,
          },
        },
      });
      return user;
    })
    .catch((e) => next(e));
});

const deleteUser = dryFn(async (req, res, next) => {
  const u1 = await Usuario.findByPk(req.params.id);
  if (!u1) {
    return next(
      new GeneralError(
        `No se encontró usuario con el email : (${req.params.id})`,
        404
      )
    );
  }
  const t = sq
    .transaction(async () => {
      const user = await Usuario.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          message: `Eliminado el user con el id : (${req.params.id})`,
        },
      });
      return user;
    })
    .catch((e) => next(e));
});

const updateUser = dryFn(async (req, res, next) => {
  const u1 = await Usuario.findByPk(req.params.id);
  if (!u1)
    return next(
      new GeneralError(
        `No se encontró el usuario con el id : (${req.params.id})`,
        404
      )
    );
  const t = sq
    .transaction(async () => {
      const usuario = await Usuario.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        success: true,
        data: {
          message: `Usuario con el id (${req.params.id}) editado correctamente`,
          updated: req.body,
        },
      });
      return usuario;
    })
    .catch((e) => next(e));
});

const getUsuarios = dryFn(async (req, res, next) => {
  const usuarios = await Usuario.findAll();
  if (usuarios.length == 0)
    return next(new GeneralError(`No existen datos de usuarios.`, 404));
  res.status(200).json({
    success: true,
    len: usuarios.length,
    data: usuarios,
  });
});

module.exports = {
  getUsuarios,
  deleteUser,
  updateUser,
  createUser,
  authUser,
};
