const { Router } = require("express");
const {
  createListaPrecio,
  deleteListaPrecio,
  getListasPrecio,
  updateListaPrecio,
} = require("../controllers/listaPrecio");

const router = Router();

router.route("/lp").post(createListaPrecio).get(getListasPrecio);
router.route("/lp/:id").delete(deleteListaPrecio).put(updateListaPrecio);

module.exports = router;
