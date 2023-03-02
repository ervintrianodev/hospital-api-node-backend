const { Schema, model } = require("mongoose");

const hospitalSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    usuario: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  { collection: "Hospitales" }
);

module.exports = model("Hospital", hospitalSchema);
