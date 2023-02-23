const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      },
      (err, jwt) => {
        if (err) {
          console.log("Hubo errores al generar el JWT porque: ", err);
          reject(`Hubo errores al generar el JWT porque ${err}`);
        } else {
          resolve(jwt);
        }
      }
    );
  });
};
module.exports = { generateJWT };
