//Al haber un error se utiliza la clase general error vía un middleware
//Esta clase puede tomar como parametro en su constructor el mensaje, sino lo hereda.
class GeneralError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

//Estás clases extienden de general error, lo cual conlleva a que cada vez que haya una instancia de ellas se genere una instancia
class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
};
