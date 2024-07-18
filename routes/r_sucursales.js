const {Router} = require("express");
const {getSucursales, createSucursal, getSucursal} = require("../controllers/sucursal");

//Instancia
const router = Router();


router.route("/sucursales").get(getSucursales).post(createSucursal)

router.route("/sucursales/:id").put().delete().get(getSucursal)


module.exports = router;