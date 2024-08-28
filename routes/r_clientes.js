const {Router} =  require("express");
const {getClientes, getCliente, updateCliente, deleteCliente, createCliente} = require("../controllers/clientes");
const protect = require("../middlewares/authmiddleware")


const router = Router();

//Espera como query opcional : {limit | ciudad | comuna}
router.route("/clientes").get(getClientes).post(createCliente)
router.route("/clientes/:rut").get(getCliente).put(updateCliente).delete(deleteCliente)

module.exports = router;