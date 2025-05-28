var express = require("express");
var router = express.Router();

var talhoesController = require("../controllers/talhoesController");

router.get("/:empresaId", function (req, res) {
  talhoesController.buscarTalhoesPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  aquarioController.cadastrar(req, res);
})

module.exports = router;