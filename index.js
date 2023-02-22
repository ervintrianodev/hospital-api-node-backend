const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

//Crear el servidor express
const app = express();

//configurar CORS
app.use(cors());

//Base de datos
dbConnection();

//Rutas
app.get("/", (req, resp) => {
  resp.status(200).json({
    ok: true,
    msg: "Hola mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriend en el puerto ", process.env.PORT);
});
