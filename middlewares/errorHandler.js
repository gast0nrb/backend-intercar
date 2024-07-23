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

  if (error.name == "SequelizeForeignKeyConstraintError") {
    let messageFor = error.parameters[0]
    //Parameters
    const message = `El valor: (${error.value}) no existe en la tabla: (${error.table}) campo: (${error.fields[0]}) (foreign key reference)`
    error = new GeneralError(message, 400);
  }

  //Validar con if las diferentes que pueden haber
  if (error.name == "SequelizeUniqueConstraintError") {
    let fields = "";
    error.errors.map((e) => {
      fields = `(${e.path})`;
    });
    const message = `El/Los campo/s ${fields.toUpperCase()} ya existe/n en la base de datos es un valor único (no repetible)`;
    error = new GeneralError(message, 400);
  }

  if (error.name == "SequelizeValidationError") {
    const fields = [];
    error.errors.map((e) => {
      fields.push(e.path.toUpperCase());
    });
    error = new GeneralError(
      `Se esperan los siguientes campos y no han sido entregados : ${fields}`,
      400
    );
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
