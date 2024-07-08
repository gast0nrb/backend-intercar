const {Router} = require("express")
const {createCategorias, listCategorias} = require("../controllers/categoria")

const router = Router();



router.route("/categorias").post(createCategorias).get(listCategorias)


router.route("/categorias/:id")



module.exports = router;