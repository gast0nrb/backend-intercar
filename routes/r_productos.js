const { Router } = require("express");
const path = require("path");
const multer = require("multer");

const {
  createProducto,
  deleteProducto,
  updateProducto,
  getProductos,
  getProducto,
  getOfertas,
  postPhoto,
  deletePhoto,
  getPhoto
} = require("../controllers/producto");

const { createPrecio, updatePrecio } = require("../controllers/listaProducto");

const { getHistoriales } = require("../controllers/historiaPrecio");

//Multer para las imagenes

//instancia
const router = Router();

//Rutas para imagenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    const nameFile = `${req.params.codigo}-${Date.now()}${ext}`;
    cb(null, nameFile);
  },
});

const upload = multer({ storage: storage });

router
  .route("/imagenes/:id")
  .get(getPhoto);

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
