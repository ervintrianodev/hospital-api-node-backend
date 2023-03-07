const { response } = require("express");
const { model } = require("mongoose");
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const loginWithGoogle = async (req, res = response) => {
  try {
    const { email, picture, name } = await googleVerify(req.body.token);
    const usuarioDB = await Usuario.findOne({ email });
    let usuario;
    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: "@@@",
        imagen: picture,
        google: true,
      });
    } else {
      usuario = usuarioDB;
      usuario.google = true;
    }
    await usuario.save();
    //generar jwt
    const token = await generateJWT(usuario.id);
    res.status(200).json({
      ok: true,
      email,
      name,
      picture,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      oj: false,
      msg: "Token de Google no es valido",
    });
  }
};

module.exports = {
  login,
  loginWithGoogle,
};
