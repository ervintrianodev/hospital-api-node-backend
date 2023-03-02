const { response } = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-image");
const fs = require("fs");

const fileUpload = (req, resp = response) => {
  const collection = req.params.collection;
  const id = req.params.id;

  const collectionsAllowed = ["medicos", "usuarios", "hospitales"];
  if (!collectionsAllowed.includes(collection)) {
    return resp.status(400).json({
      ok: false,
      msg: "La collection proporcionada no corresponde a un tipo valido",
    });
  }
  //validamos que exista un archivo en la request
  if (!req.files || Object.keys(req.files).length === 0) {
    return resp.status(400).json({
      ok: false,
      msg: "No hay ningun archivo",
    });
  }

  //procesar la imagen
  const file = req.files.imagen;
  console.log(file);
  const nombreCortado = file.name.split(".");
  const extension = nombreCortado[nombreCortado.length - 1];

  //validar extensiones
  const extencionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extencionesValidas.includes(extension)) {
    return resp.status(400).json({
      ok: false,
      msg: "La extension del archivo no es valida",
    });
  }
  //Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extension}`;
  //path para guardar la imagen
  const path = `./uploads/${collection}/${nombreArchivo}`;
  //movel la imagen
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return resp
        .status(500)
        .json({ ok: false, msg: "Error al mover la imagen" });
    }
    //Actualizar la base de datos
    actualizarImagen(collection, id, nombreArchivo);

    resp.json({
      ok: true,
      msg: "Archivo subido",
      nombreArchivo,
    });
  });
};

const showImage = (req, res = response) => {
  const tipo = req.params.collection;
  const imgName = req.params.img;
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${imgName}`);
  //imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, "../uploads/no-image.png");
    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUpload,
  showImage,
};
