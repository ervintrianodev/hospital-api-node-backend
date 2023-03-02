const Usuario = require("../models/usuario.model");
const Medico = require("../models/medicos.model");
const Hospital = require("../models/hospital.model");
const fs = require("fs");

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    //borramos la imagen anterior
    fs.unlinkSync(path);
  }
};

const actualizarImagen = async (collection, id, nombreArchivo) => {
  let pathViejo = "";
  switch (collection) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("No se encontro el medico por el id");
        return false;
      }
      pathViejo = `./uploads/medicos/${medico.img}`;
      deleteImage(pathViejo);
      medico.img = nombreArchivo;
      await medico.save();
      return true;
      break;
    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("No se encontro el usuario por el id proporcionado");
        return false;
      }
      pathViejo = `./uploads/usuarios/${usuario.imagen}`;
      deleteImage(pathViejo);
      usuario.imagen = nombreArchivo;
      await usuario.save();
      return true;
      break;

    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("No existe un hospital con el id proporcionado");
        return false;
      }
      pathViejo = `./uploads/hospitales/${hospital.img}`;
      deleteImage(pathViejo);
      hospital.img = nombreArchivo;
      await hospital.save();
      return true;
      break;

    default:
      break;
  }
};

module.exports = {
  actualizarImagen,
};
