const { response } = require("express");
const Hospital = require("../models/hospital.model");

const getHospitales = async (req, resp = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre");
  try {
    resp.status(200).json({
      ok: true,
      hospitales,
    });
  } catch (error) {
    console.log(
      `Hubo algunos errores al recuperar todos los hospitales porque ${error}`
    );
    resp.status(500).json({
      ok: false,
      msg: `Hubo algunos errores al recuperar la lista de los hospitales porque ${error}`,
    });
  }
};

const saveHospital = async (req, resp = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body });

  try {
    const hospitalSaved = await hospital.save();
    resp.status(200).json({
      ok: true,
      msg: "Hospital guardado",
      hospital: hospitalSaved,
    });
  } catch (error) {
    console.log("Hubo un error al guardar el hospital porque, ", error);
    return resp.status(500).json({
      ok: false,
      msg: `Hubo un error al guardar el hospital porque: ${error}`,
    });
  }
};

const updateHospital = async (req, resp = response) => {
  const hospitalId = req.params.id;
  const uid = req.body.uid;
  try {
    const hospitalDB = Hospital.findById(hospitalId);
    if (!hospitalDB) {
      return resp.status(404).json({
        ok: true,
        msg: "El hospital no se encontro en la base de datos",
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };
    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      hospitalId,
      cambiosHospital,
      { new: true }
    );
    resp.status(200).json({
      ok: true,
      hospitalId,
      msg: "El hospital ha sido actualizado con exito",
      hospital: hospitalActualizado,
    });
  } catch (error) {
    console.log(
      `Hubo algunos errores al acutalizar el hospital porque ${error}`
    );
    resp.status(400).json({
      ok: false,
      msg: `Hubo errores al actualizar el hospital porque ${error}`,
    });
  }
};
const deleteHospital = async (req, resp = response) => {
  const hospitalId = req.params.id;
  try {
    const hospitalDB = Hospital.findById(hospitalId);
    if (!hospitalDB) {
      return resp.status(404).json({
        ok: false,
        msg: "El hospital no esta en la base de datos",
      });
    }
    const hospitalEliminado = await Hospital.findByIdAndDelete(hospitalId);
    resp.status(200).json({
      ok: true,
      msg: "El hospital ha sido eliminado con exito",
      hospital: hospitalEliminado,
    });
  } catch (error) {
    console.log(
      `Hubo algunos errores al eliminar el hospital porque: ${error}`
    );
    resp.json({
      ok: false,
      msg: `Hubo algunos errores al eliminar el hospital porque ${error}`,
    });
  }
};

module.exports = {
  getHospitales,
  saveHospital,
  updateHospital,
  deleteHospital,
};
