const Router = require("express");
const {
  getBusquedas,
  getDocumentosCollection,
} = require("../controllers/busquedas.controller");
const { validateJWT } = require("../middlewares/validar/jwt");

const router = Router();

router.get("/:query", [validateJWT], getBusquedas);
router.get("/collection/:collectionName/:term", [
  validateJWT,
  getDocumentosCollection,
]);

module.exports = router;
