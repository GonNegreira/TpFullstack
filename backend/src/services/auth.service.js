const bcrypt = require("bcrypt");

const { Usuario } = require("../models");

const AppError = require("../utils/AppError");

const {
  generateToken,
} = require("../utils/jwt");

async function register(data) {

  const existente =
    await Usuario.findOne({
      where: {
        email: data.email,
      },
    });

  if (existente) {
    throw new AppError(
      "El email ya existe",
      400
    );
  }

  const passwordHash =
    await bcrypt.hash(
      data.password,
      10
    );

  const usuario =
    await Usuario.create({
      nombre: data.nombre,
      email: data.email,
      passwordHash,
      rol: "colaborador",
      activo: true,
    });

  return usuario;
}

async function login(
  email,
  password
) {

  const usuario =
    await Usuario.findOne({
      where: { email },
    });

  if (!usuario) {
    throw new AppError(
      "Credenciales inválidas",
      401
    );
  }

  const coincide =
    await bcrypt.compare(
      password,
      usuario.passwordHash
    );

  if (!coincide) {
    throw new AppError(
      "Credenciales inválidas",
      401
    );
  }

  const token =
    generateToken(usuario);

  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    },
  };
}

module.exports = {
  register,
  login,
};