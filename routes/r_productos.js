const { Router } = require("express");

//instancia
const router = Router();

router.route("/productos").get().post();

router.route("/productos/:codigo").get().post().put().delete();

module.exports = router;
