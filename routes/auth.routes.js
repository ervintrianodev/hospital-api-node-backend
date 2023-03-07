//path: '/loging'
const { Router } = require("express");
const { check } = require("express-validator");
const { login, loginWithGoogle } = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").notEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/signin/google",
  [check("token", "El token de google es obligatorio").notEmpty()],
  loginWithGoogle
);

module.exports = router;
