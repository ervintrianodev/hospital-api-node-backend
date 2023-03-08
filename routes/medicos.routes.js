//Medicos
//Path: /api/medicos
const { Router } = require("express");
const Rouer = require("express");
const { check } = require("express-validator");
const {
  getMedicos,
  saveMedico,
  updateMedico,
  deleteMedico,
} = require("../controllers/medicos.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar/jwt");

const router = Router();

router.get("/", [], getMedicos);
router.post(
  "/",
  [
    validateJWT,
    check("nombre", "El nombre del medico es obligatorio").notEmpty(),
    check("hospital", "El id del hospital es obligatorio").isMongoId(),
    validarCampos,
  ],
  saveMedico
);
router.put(
  "/:id",
  [
    validateJWT,
    check("nombre", "El nombre del medico es obligatrorio").notEmpty(),
    check("hospital", "El id del hospital es obligatorio").notEmpty(),
  ],
  updateMedico
);
router.delete("/:id", [validateJWT], deleteMedico);

module.exports = router;
