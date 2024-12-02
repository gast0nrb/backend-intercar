const { Router } = require("express");
const {
  createCategorias,
  listCategorias,
  updateCategoria,
  deleteCategoria,
  getProductosByCategoria
} = require("../controllers/categoria");

const router = Router();

router.route("/categorias/:id/productos").get(getProductosByCategoria)

router.route("/categorias").post(createCategorias).get(listCategorias);
router.route("/categorias/:id").put(updateCategoria).delete(deleteCategoria)

module.exports = router;
