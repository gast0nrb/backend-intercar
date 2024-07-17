const {Router} = require("express");
const {getCiudades, getComunasByCiudades} = require("../controllers/ciudad");


const router = Router();


router.route("/ciudades").get(getCiudades);
router.route("/ciudades/comunas/:id").get(getComunasByCiudades)


module.exports = router;