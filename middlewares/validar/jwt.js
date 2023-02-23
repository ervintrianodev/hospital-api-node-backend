const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, resp = response, next) => {
  //leet el token
  const token = req.header("x-api-key");
  if (!token) {
    return resp.status(401).json({
      ok: false,
      msg: "Nos hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    return resp.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validateJWT,
};
