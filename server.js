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

//Instancias
const app = express()
const PORT = process.env.PORT || 8080


//Test db 
testConn();

//Middlewares para las rutas
app.use(express.json())


//rutas
app.use("/api/v0.5/webintercar", r_categoria);
app.use("/api/v0.5/webintercar", r_ciudades);
app.use("/api/v0.5/webintercar", r_sucursales);


//Error handlers
app.use(logError)
app.use(handleErrors)

app.listen(PORT,()=> console.log(`Running on http://localhost:${PORT}`))