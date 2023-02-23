const { response } = require("express");
const { model } = require("mongoose");
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const login = async (req, resp = response) => {
  const { email, password } = req.body;
  try {
    const usuarioDB = await Usuario.findOne({ email });
    //verificar email
    if (!usuarioDB) {
      return resp.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }
    //verificar password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return resp
        .status(400)
        .json({ ok: false, msg: "El password no es valido" });
    }
    //Generar Token
    const token = await generateJWT(usuarioDB.id);
    resp.status(200).json({
      ok: false,
      token,
    });
  } catch (error) {
    console.log("Hubo errores al hacer login porque: ", error);
    return resp.status(500).json({
      ok: false,
      msg: `Hubo errores al hacer login porque ${error}`,
    });
  }
};

module.exports = {
  login,
};
