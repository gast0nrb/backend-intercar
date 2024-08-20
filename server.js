//Moduilos de terceros
const express = require("express")
const dotenv = require("dotenv").config()
const testConn = require("./database/testConn")

//Modulos propios
const {handleErrors, logError} = require("./middlewares/errorHandler")

//Routes imports
const r_categoria = require("./routes/r_categoria")
const r_ciudades = require("./routes/r_ciudades");
const r_sucursales = require("./routes/r_sucursales");
const r_clientes = require("./routes/r_clientes");
const r_productos = require("./routes/r_productos");
const r_listaPrecio = require("./routes/r_listaPrecio");
const r_carro = require("./routes/r_carro")
const r_usuario = require("./routes/r_usuario")
const r_permiso = require("./routes/r_permisos")

//Instancias
const app = express()
const PORT = process.env.PORT || 8080

//Test db 
testConn();

//Middlewares para las rutas
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//rutas
app.use("/api/v0.5/webintercar", r_categoria);
app.use("/api/v0.5/webintercar", r_ciudades);
app.use("/api/v0.5/webintercar", r_sucursales);
app.use("/api/v0.5/webintercar", r_clientes);
app.use("/api/v0.5/webintercar", r_productos);
app.use("/api/v0.5/webintercar", r_listaPrecio);
app.use("/api/v0.5/webintercar", r_carro);
app.use("/api/v0.5/webintercar", r_usuario);
app.use("/api/v0.5/webintercar", r_permiso);

//Error handlers
app.use(logError)
app.use(handleErrors)

app.listen(PORT,()=> console.log(`Running on http://localhost:${PORT}`))