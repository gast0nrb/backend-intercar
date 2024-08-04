const { Router } = require("express");
const {
  createProducto,
  deleteProducto,
  updateProducto,
  getProductos,
  getProducto,
  getOfertas,
} = require("../controllers/producto");

const { createPrecio, updatePrecio } = require("../controllers/listaProducto");

const { getHistoriales } = require("../controllers/historiaPrecio");

//instancia
const router = Router();

router.route("/productos").get(getProductos).post(createProducto);

router
  .route("/productos/:codigo")
  .get(getProducto)
  .put(updateProducto)
  .delete(deleteProducto);

router.route("/ofertas").get(getOfertas);

//Rutas para modificar los precios de los productos
router.route("/productos/precios").post(createPrecio);
router.route("/productos/:codigo/precios/:lista").put(updatePrecio);

//ruta para obtener el historial de los productos
router.route("/historiales/productos").get(getHistoriales);

module.exports = router;
