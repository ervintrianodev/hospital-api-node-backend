const { Schema, model } = require("mongoose");

const MedicosSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
  },
  { collection: "Medicos" }
);

module.exports = model("Medico", MedicosSchema);
