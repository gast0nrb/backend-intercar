const { Router } = require("express");
const {
  createProducto,
  deleteProducto,
  updateProducto,
  getProductos,
} = require("../controllers/producto");

const { createPrecio, updatePrecio } = require("../controllers/listaProducto");

//instancia
const router = Router();

router.route("/productos").get(getProductos).post(createProducto);

router
  .route("/productos/:codigo")
  .get()
  .put(updateProducto)
  .delete(deleteProducto);

//Rutas para modificar los precios de los productos
router.route("/productos/precios").post(createPrecio);
router.route("/productos/:codigo/precios/:lista").put(updatePrecio);

module.exports = router;
