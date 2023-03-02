const { response, json } = require("express");
const Usuario = require("../models/usuario.model");
const Medico = require("../models/medicos.model");
const Hospitales = require("../models/hospital.model");

const getBusquedas = async (req, resp = response) => {
  const termino = req.params.query;
  const regexp = new RegExp(termino, "i");

  /* const usuarios = await Usuario.find({ nombre: regexp });
  const medicos = await Medico.find({ nombre: regexp });
  const hospitales = await Hospitales.find({ nombre: regexp }); */

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regexp }),
    Medico.find({ nombre: regexp }),
    Hospitales.find({ nombre: regexp }),
  ]);
  resp.status(200).json({
    ok: true,
    msg: "Vamos a intentar a hacer busquedas",
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocumentosCollection = async (req, resp = response) => {
  const collectionName = req.params.collectionName;
  const termino = req.params.term;
  const regexp = new RegExp(termino, "i");

  let data = [];

  switch (collectionName) {
    case "medicos":
      data = await Medico.find({ nombre: regexp })
        .populate("usuario", "nombre")
        .populate("hospital", "nombre");
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regexp });
      break;
    case "hospitales":
      data = await Hospitales.find({ nombre: regexp }).populate(
        "usuario",
        "nombre"
      );
      break;
    default:
      return resp.status(400).json({
        ok: false,
        msg: "No hay tabla con la colection proporcionada",
      });
  }

  resp.status(200).json({
    ok: true,
    data,
  });
};

module.exports = {
  getBusquedas,
  getDocumentosCollection,
};
