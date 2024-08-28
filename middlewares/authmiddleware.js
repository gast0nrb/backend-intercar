const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Usuario = require("../models/Usuario");
const { GeneralError } = require("../utils/classErrors");
const JWT_SECRET = process.env.JWT_SECRET;

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.catjwt;

  console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await Usuario.findByPk(decoded.userId, {
        attributes: { exclude: "passwd" },
      });
      next();
    } catch (err) {
      next(new GeneralError("No autorizado, token no valido", 401));
    }
  } else {
    next(new GeneralError("No autorizado, token no existe", 401));
  }
});

module.exports = protect;
