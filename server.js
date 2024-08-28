//Moduilos de terceros
const express = require("express");
const dotenv = require("dotenv").config();
const testConn = require("./database/testConn");
const cookieParser = require("cookie-parser");

//Modulos propios
const { handleErrors, logError } = require("./middlewares/errorHandler");

//Routes imports
const r_categoria = require("./routes/r_categoria");
const r_ciudades = require("./routes/r_ciudades");
const r_sucursales = require("./routes/r_sucursales");
const r_clientes = require("./routes/r_clientes");
const r_productos = require("./routes/r_productos");
const r_listaPrecio = require("./routes/r_listaPrecio");
const r_carro = require("./routes/r_carro");
const r_usuario = require("./routes/r_usuario");
const r_permiso = require("./routes/r_permisos");
const protect = require("./middlewares/authmiddleware");

//Instancias
const app = express();
const PORT = process.env.PORT || 8080;

//Test db
testConn();

//Middlewares para las rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//rutas
app.use("/api/v0.5/webintercar", r_categoria);
app.use("/api/v0.5/webintercar", r_ciudades);
app.use("/api/v0.5/webintercar", r_sucursales);
app.use("/api/v0.5/webintercar", r_productos);
app.use("/api/v0.5/webintercar", r_listaPrecio);
app.use("/api/v0.5/webintercar", r_usuario);
app.use("/api/v0.5/webintercar", r_permiso);


//Rutas protegidas
app.use("/api/v0.5/webintercar",protect, r_carro);
app.use("/api/v0.5/webintercar",protect, r_clientes);


//Error handlers
app.use(logError);
app.use(handleErrors);

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
