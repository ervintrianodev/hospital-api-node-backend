//Path: /api/users
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsuarios,
  saveUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar/jwt");

const router = Router();

router.get("/", validateJWT, getUsuarios);
router.post(
  "/",
  [
    check("nombre", "EL nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  saveUsuario
);

router.put(
  "/:id",
  [
    validateJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El role es obligatorio").notEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete("/:id", validateJWT, eliminarUsuario);

module.exports = router;
