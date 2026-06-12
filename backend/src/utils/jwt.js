const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

function generateToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    },
    jwtConfig.secret,
    {
      expiresIn: jwtConfig.expiresIn,
    }
  );
}

function verifyToken(token) {
  return jwt.verify(
    token,
    jwtConfig.secret
  );
}

module.exports = {
  generateToken,
  verifyToken,
};