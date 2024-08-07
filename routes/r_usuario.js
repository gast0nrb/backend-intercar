const {Router} = require("express")
const {createUser,deleteUser,getUsuarios,updateUser} = require("../controllers/usuario")



const router = Router();


router.route("/usuarios").get(getUsuarios).post(createUser)

router.route("/usuarios/:id").put(updateUser).delete(deleteUser)


module.exports = router;