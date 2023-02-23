const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");

const getUsuarios = async (req, resp) => {
  const usuarios = await Usuario.find({}, "nombre email google role");
  resp.status(200).json({
    ok: true,
    usuarios: [
      {
        id: "123",
        usuarios,
      },
    ],
    uid: req.uid,
  });
};

const saveUsuario = async (req, resp = response) => {
  console.log("Vamos a interntar guardar al usuario");
  const { nombre, password, email } = req.body;

  try {
    const existEmail = await Usuario.findOne({ email });
    if (existEmail) {
      return resp.status(400).json({
        ok: false,
        msg: "El email ya esta registrado",
      });
    }
    const usuario = new Usuario(req.body);
    //Encriptar password
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar al usuario
    const usuarioDB = await usuario.save();
    //generar el token
    const token = await generateJWT(usuarioDB.id);
    return resp.status(201).json({
      ok: true,
      msg: "Usuario guardado",
      usuario,
      token,
    });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};

const actualizarUsuario = async (req, resp = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return resp
        .status(404)
        .json({ ok: false, msg: "No Existe usuario con el id proporcionado" });
    }

    //TODO:Validar toker y validar si es el usuario correcto

    //Actualizacion
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existEmail = await Usuario.findOne({ email });
      if (existEmail) {
        return resp.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }
    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    return resp.json({
      ok: true,
      msg: "El usuario ha sido actualizado satisfactoriamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log("Error al actualizar usuarios porque: ", error);
    return resp.status(400).json({
      ok: false,
      msg: "Error al actualizar el usuario",
    });
  }
};

const eliminarUsuario = async (req, resp = response) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return resp.status(400).json({
        ok: false,
        msg: "El usuario no existe con el id propoercionado",
      });
    }
    await Usuario.findByIdAndDelete(uid);
    return resp.status(200).json({
      ok: true,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    console.log("Hubo errroes al eliminar porque: ", error);
    return resp.status(500).json({
      ok: false,
      msg: "Hubo errores al eliminar el usuario",
    });
  }
};
module.exports = {
  getUsuarios,
  saveUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
