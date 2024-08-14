const { Router } = require("express");
const {
  createCarro,
  deleteCarro,
  getCarro,
  getCarros,
  updateCarro,
} = require("../controllers/carro");

const { getHistoriaCarro } = require("../controllers/historiaCarro");

const {
  createDetalleCarro,
  updateDetalleCarro,
} = require("../controllers/detalleCarro");

const router = Router();


//Solo un carro
router.route("/carros/:id").put(updateCarro).delete(deleteCarro).get(getCarro);

//Post un carro
router.route("/carros").post(createCarro).get(getCarros);



//Editar articulo carro (producto x carro)
router.route("/carros/:carro/:producto").put(updateDetalleCarro);

//Agregar articulo al carro
router.route("/carro/detalle").post(createDetalleCarro);

//historia carro
router.route("/carros/historia/:id").get(getHistoriaCarro);

module.exports = router;
