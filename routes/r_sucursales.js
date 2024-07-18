const {Router} = require("express");
const {getSucursales} = require("../controllers/sucursal");

//Instancia
const router = Router();


router.route("/sucursales").get(getSucursales).post()

router.route("/sucursales/:id").put().delete()


module.exports = router;