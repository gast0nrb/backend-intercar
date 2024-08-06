const {Router} = require("express")
const {createCarro,deleteCarro,getCarro,getCarros, updateCarro} = require("../controllers/carro")


const router = Router();


router.route("/carros/:id").put(updateCarro).delete(deleteCarro)

router.route("/carros").post(createCarro)


module.exports = router;