const authService =
  require("../services/auth.service");

async function register(
  req,
  res,
  next
) {
  try {

    const usuario =
      await authService.register(
        req.body
      );

    res.status(201).json(usuario);

  } catch (error) {
    next(error);
  }
}

async function login(
  req,
  res,
  next
) {
  try {

    const resultado =
      await authService.login(
        req.body.email,
        req.body.password
      );

    res.json(resultado);

  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
};