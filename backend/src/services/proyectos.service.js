const {
  Proyecto,
  Usuario,
  Tarea
} = require("../models");

const AppError =
  require("../utils/AppError");

const {
  canTransition
} = require(
  "../utils/proyectoEstados"
);

async function getEstadisticas(
  proyectoId
) {

  const proyecto =
    await Proyecto.findByPk(
      proyectoId
    );

  if (!proyecto) {

    throw new AppError(
      "Proyecto no encontrado",
      404
    );

  }

  const tareas =
    await Tarea.findAll({
      where: {
        proyectoId
      }
    });

  return {

    proyectoId:
      proyecto.id,

    nombre:
      proyecto.nombre,

    total:
      tareas.length,

    pendientes:
      tareas.filter(
        tarea =>
          tarea.estado ===
          "pendiente"
      ).length,

    enProgreso:
      tareas.filter(
        tarea =>
          tarea.estado ===
          "en_progreso"
      ).length,

    bloqueadas:
      tareas.filter(
        tarea =>
          tarea.estado ===
          "bloqueada"
      ).length,

    finalizadas:
      tareas.filter(
        tarea =>
          tarea.estado ===
          "finalizada"
      ).length,

    canceladas:
      tareas.filter(
        tarea =>
          tarea.estado ===
          "cancelada"
      ).length

  };

}

async function cambiarEstado(
  proyectoId,
  nuevoEstado
) {

  const proyecto =
    await Proyecto.findByPk(
      proyectoId
    );

  if (!proyecto) {

    throw new AppError(
      "Proyecto no encontrado",
      404
    );

  }

  if (
    !canTransition(
      proyecto.estado,
      nuevoEstado
    )
  ) {

    throw new AppError(
      `No se puede pasar de ${proyecto.estado} a ${nuevoEstado}`,
      400
    );

  }

  proyecto.estado =
    nuevoEstado;

  await proyecto.save();

  return proyecto;

}

async function getAll() {

  return Proyecto.findAll({

    include: [

      Usuario,

      Tarea

    ]

  });

}

async function getById(id) {

  const proyecto =
    await Proyecto.findByPk(
      id,
      {
        include: [
          Usuario,
          Tarea
        ]
      }
    );

  if (!proyecto) {

    throw new AppError(
      "Proyecto no encontrado",
      404
    );

  }

  return proyecto;

}

async function pausar(
  proyectoId
) {

  return cambiarEstado(
    proyectoId,
    "pausado"
  );

}

async function reactivar(
  proyectoId
) {

  return cambiarEstado(
    proyectoId,
    "activo"
  );

}

async function finalizar(
  proyectoId
) {

  return cambiarEstado(
    proyectoId,
    "finalizado"
  );

}

async function create(data) {

  const proyectoExistente =
    await Proyecto.findOne({
      where: {
        codigo: data.codigo
      }
    });

  if (proyectoExistente) {

    throw new AppError(
      "Ya existe un proyecto con ese código",
      400
    );

  }

  return await Proyecto.create({

    codigo:
      data.codigo,

    nombre:
      data.nombre,

    descripcion:
      data.descripcion,

    estado:
      "activo"

  });

}

async function update(id, data) {

  const proyecto =
    await Proyecto.findByPk(id);

  if (!proyecto) {

    throw new AppError(
      "Proyecto no encontrado",
      404
    );

  }

  const proyectoConCodigo =
    await Proyecto.findOne({
      where: {
        codigo: data.codigo
      }
    });

  if (
    proyectoConCodigo &&
    proyectoConCodigo.id !== proyecto.id
  ) {

    throw new AppError(
      "Ya existe un proyecto con ese código",
      400
    );

  }

  proyecto.codigo =
    data.codigo;

  proyecto.nombre =
    data.nombre;

  proyecto.descripcion =
    data.descripcion;

  proyecto.estado =
    data.estado;

  await proyecto.save();

  return proyecto;

}

async function remove(id) {

  const proyecto =
    await Proyecto.findByPk(
      id,
      {
        include: [Tarea]
      }
    );

  if (!proyecto) {

    throw new AppError(
      "Proyecto no encontrado",
      404
    );

  }

  if (
    proyecto.Tareas &&
    proyecto.Tareas.length > 0
  ) {

    throw new AppError(
      "No se puede eliminar un proyecto que tiene tareas asociadas",
      400
    );

  }

  await proyecto.destroy();

  return {
    message:
      "Proyecto eliminado correctamente"
  };

}

module.exports = {

  getAll,

  getById,

  create,

  update,

  remove,

  getEstadisticas,

  pausar,

  reactivar,

  finalizar

};