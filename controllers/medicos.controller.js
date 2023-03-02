const { response } = require("express");
const Medico = require("../models/medicos.model");

const getMedicos = async (req, resp = response) => {
  try {
    const medicos = await Medico.find()
      .populate("usuario", "nombre")
      .populate("hospital", "nombre");
    resp.status(200).json({
      ok: true,
      medicos,
    });
  } catch (error) {
    console.log(
      `Hubo un error al recuperar la lista de los medicos porque ${error}`
    );
    resp.status(500).json({
      ok: false,
      msg: `Hubo un error al recuperar la lista de los medicos porque ${error}`,
    });
  }
};

const saveMedico = async (req, resp = response) => {
  const uid = req.uid;
  const hospitalId = req.hospital;
  console.log(`El id del usuario es ${uid}`);
  try {
    const medico = new Medico({
      usuario: uid,
      hospital: hospitalId,
      ...req.body,
    });
    const medicodb = await medico.save(medico);
    resp.status(200).json({
      ok: true,
      msg: "El registro del medico se ha guardado exitosamente!",
      medico: medicodb,
    });
  } catch (error) {
    console.log(`Hubo un error al guardar el medico porque ${error}`);
    return resp.status(200).json({
      ok: false,
      msg: `Hubo un error al guardar al medico porque: ${error}`,
    });
  }
};

const updateMedico = (req, resp = response) => {
  resp.status(200).json({
    ok: false,
    msg: "Updating Medico",
  });
};

const deleteMedico = (req, resp = response) => {
  resp.status(200).json({
    ok: false,
    msg: "Deleting Medico",
  });
};

module.exports = {
  getMedicos,
  saveMedico,
  updateMedico,
  deleteMedico,
};
