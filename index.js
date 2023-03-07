const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

//Crear el servidor express
const app = express();

//configurar CORS
app.use(cors());

//Carpeta publica
app.use(express.static("public"));

//lectura y parse del body
app.use(express.json());

//Base de datos
dbConnection();

//Rutas
app.use("/api/users", require("./routes/usuarios.routes"));
app.use("/api/hospitales", require("./routes/hostpitales.routes"));
app.use("/api/medicos", require("./routes/medicos.routes"));
app.use("/login", require("./routes/auth.routes"));
app.use("/buscar", require("./routes/busquedas.routes"));
app.use("/api/uploads", require("./routes/uploads.routes"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriend en el puerto ", process.env.PORT);
});
