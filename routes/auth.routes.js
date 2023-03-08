//path: '/login'
const { Router } = require("express");
const { check } = require("express-validator");
const {
  login,
  loginWithGoogle,
  revalidateToken,
} = require("../controllers/auth.controller");
const { generateJWT } = require("../helpers/jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar/jwt");

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

router.get("/revalidate-token", validateJWT, revalidateToken);
module.exports = router;
