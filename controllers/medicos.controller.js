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

const updateMedico = async (req, resp = response) => {
  const medicoId = req.params.id;
  const uid = req.body.uid;
  try {
    const medicoDB = Medico.findById(medicoId);
    if (!medicoDB) {
      return resp.status(404).json({
        ok: false,
        msg: "El medico no se encuentra en la base de datos",
      });
    }
    const cambiosMedicos = {
      ...req.body,
      usuario: uid,
    };
    const medicoActualizado = await Medico.findByIdAndUpdate(
      medicoId,
      cambiosMedicos,
      { new: true }
    );
    resp.status(200).json({
      ok: false,
      msg: "El medico ha sido actualizado satisfacroriamente",
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(`Hubo algunos errores al actualizar al medico porque ${error}`);
    resp.status(400).json({
      ok: false,
      msg: `Hubo algunos errores al actualizar al medico porque ${error}`,
    });
  }
};

const deleteMedico = async (req, resp = response) => {
  const medicoId = req.params.id;
  try {
    const medicoDB = Medico.findById(medicoId);
    if (!medicoDB) {
      return resp.status(400).json({
        ok: false,
        msg: "El medico no existe en nuestra base de datos",
      });
    }

    const medicoEliminado = await Medico.findByIdAndDelete(medicoId);
    resp.status(200).json({
      ok: false,
      msg: "El medico ha sido eliminado satisfactoriamente",
      medico: medicoEliminado,
    });
  } catch (error) {
    console.log(`Hubo algunos errores al eliminar al medico porque ${error}`);
    resp.status(400).json({
      ok: false,
      msg: `Hubo algunos errores al eliminar al medico porque ${error}`,
    });
  }
};

module.exports = {
  getMedicos,
  saveMedico,
  updateMedico,
  deleteMedico,
};
