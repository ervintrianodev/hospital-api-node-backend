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

const updateHospital = (req, resp = response) => {
  resp.status(200).json({
    ok: true,
    msg: "Acutalizar hospital",
  });
};
const deleteHospital = (req, resp = response) => {
  resp.status(200).json({
    ok: true,
    msg: "Eliminar Hospital",
  });
};

module.exports = {
  getHospitales,
  saveHospital,
  updateHospital,
  deleteHospital,
};
