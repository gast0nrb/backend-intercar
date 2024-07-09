const { GeneralError } = require("../utils/classErrors");
const sq = require("../database/connection");
const colors = require("colors");

const printError = (error) => {
  console.log("--------------------".red);
  console.error(error);
  console.log("--------------------".red);
};

const logError = (err, req, res, next) => {
  printError(err);
  next(err);
};

const handleErrors = (err, req, res, next) => {
  //Crea una copia del error
  let error = { ...err };

  //Setea el mensaje de error igual al err.message
  error.message = err.message;

  //Validar con if las diferentes que pueden haber
  if (error.name == "SequelizeUniqueConstraintError") {
    const message = `El valor "${error.errors[0].value}" ya existe en la base de datos`;
    error = new GeneralError(message, 400);
  }

  if (error.name == "SequelizeValidationError") {
    const message = `Revisar con varios valores para devolver el array`;
    error = new GeneralError(message, 400);
  }

  if (error.name == "SequelizeDatabaseError") {
    const message = `El id entregado en el parametro no corresponde a un id de tipo int`;
    error = new GeneralError(message, 400);
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || "SERVER ERROR",
    },
  });
};

module.exports = { handleErrors, logError };
