const { Usuario } =
  require("../models");

const AppError =
  require("../utils/AppError");

async function getAll() {

  return Usuario.findAll({

    attributes: [
      "id",
      "nombre",
      "email",
      "rol",
      "activo"
    ]

  });

}

async function getById(id) {

  const usuario =
    await Usuario.findByPk(
      id,
      {
        attributes: [
          "id",
          "nombre",
          "email",
          "rol",
          "activo"
        ]
      }
    );

  if (!usuario) {

    throw new AppError(
      "Usuario no encontrado",
      404
    );

  }

  return usuario;

}

async function getActivos() {

  return Usuario.findAll({

    where: {
      activo: true
    },

    attributes: [
      "id",
      "nombre"
    ]

  });

}

module.exports = {

  getAll,

  getById,

  getActivos

};