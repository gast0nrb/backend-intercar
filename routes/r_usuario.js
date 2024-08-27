const { Router } = require("express");
const {
  authUser,
  createUser,
  deleteUser,
  getUsuarios,
  updateUser,
} = require("../controllers/usuario");

const router = Router();

//Auth
router.route("/login").post(authUser);

//create user

router.route("/usuarios").get(getUsuarios).post(createUser);

router.route("/usuarios/:id").put(updateUser).delete(deleteUser);

module.exports = router;
