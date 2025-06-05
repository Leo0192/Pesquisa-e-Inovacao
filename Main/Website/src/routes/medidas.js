var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idTalhao", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idTalhao", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/sensor-talhao/:idTalhao", function (req, res) {
    medidaController.buscarSensorPorTalhão(req, res);
})

module.exports = router;