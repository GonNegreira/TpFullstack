const {
  HistorialTarea
} = require("../models");

async function registrarCambio({
  tareaId,
  usuarioId,
  accion,
  valorAnterior,
  valorNuevo
}) {

  return await HistorialTarea.create({

    tareaId,

    usuarioId,

    accion,

    valorAnterior,

    valorNuevo,

    fechaHora: new Date()

  });

}

async function obtenerHistorial(
  tareaId
) {

  return await HistorialTarea.findAll({

    where: {
      tareaId
    },

    order: [
      ["fechaHora", "DESC"]
    ]

  });

}

module.exports = {
  registrarCambio,
  obtenerHistorial
};