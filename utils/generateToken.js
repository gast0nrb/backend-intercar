const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (res, userId, fk_permiso) => {
  const token = jwt.sign({ userId, fk_permiso }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("catjwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;
