//Hospitales
//Path: /api/hospitales
const Router = require("express");
const { check } = require("express-validator");
const {
  getHospitales,
  saveHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitales.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar/jwt");

const router = Router();
router.get("/", [], getHospitales);
router.post(
  "/",
  [
    validateJWT,
    check("nombre", "El nombre del hospital es necesario").notEmpty(),
    validarCampos,
  ],
  saveHospital
);
router.put("/:id", [], updateHospital);
router.delete("/:id", [], deleteHospital);

module.exports = router;
