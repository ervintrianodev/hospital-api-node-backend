const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnection = async () => {
  try {
    console.log(process.env.URL_DB_CONNECTION);
    await mongoose.connect(process.env.URL_DB_CONNECTION);
    console.log("Base de datos ONLINE");
  } catch (error) {
    console.log(error);
    throw new Error(
      "Hubo un error al iniciar la conexion con la base de datos"
    );
  }
};

module.exports = {
  dbConnection,
};
