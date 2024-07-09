const { Router } = require("express");
const {
  createCategorias,
  listCategorias,
  updateCategoria,
} = require("../controllers/categoria");

const router = Router();

router.route("/categorias").post(createCategorias).get(listCategorias);
router.route("/categorias/:id").put(updateCategoria);

module.exports = router;
