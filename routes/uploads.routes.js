const Router = require("express");
const { fileUpload, showImage } = require("../controllers/uploads.controller");
const { validateJWT } = require("../middlewares/validar/jwt");
const expressFiileUpload = require("express-fileupload");

const router = Router();
router.use(expressFiileUpload());
router.put("/:collection/:id", validateJWT, fileUpload);
router.get("/:collection/:img", showImage);
module.exports = router;
