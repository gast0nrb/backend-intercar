const {Router} = require("express");
const {getSucursales, createSucursal, getSucursal, deleteSucursal, updateSucursal} = require("../controllers/sucursal");

//Instancia
const router = Router();


router.route("/sucursales").get(getSucursales).post(createSucursal)

router.route("/sucursales/:id").put(updateSucursal).delete(deleteSucursal).get(getSucursal)


module.exports = router;