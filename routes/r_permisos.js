const {Router} = require("express")
const {createPermiso,deletePermiso,getPermisos, updatePermiso} = require("../controllers/permiso")


const router = Router()


router.route("/permisos").get(getPermisos).post(createPermiso)

router.route("/permisos/:id").put(updatePermiso).delete(deletePermiso)

module.exports = router
