const {
  verifyToken,
} = require("../utils/jwt");

function authenticateJWT(
  req,
  res,
  next
) {

  const header =
    req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      error:
        "Token no proporcionado",
    });
  }

  const token =
    header.split(" ")[1];

  try {

    const payload =
      verifyToken(token);

    req.user = payload;

    next();

  } catch {

    return res.status(401).json({
      error: "Token inválido",
    });
  }
}

module.exports =
  authenticateJWT;