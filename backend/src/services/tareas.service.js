const historialService =
  require("./historial.service");

const {
  canTransition
} = require("../utils/estados");

const {
  Tarea,
  Proyecto,
  Usuario
} = require("../models");

const AppError =
  require("../utils/AppError");

const { Op, literal } =        // <- mover acá, fuera de la función
  require("sequelize");

const PRIORIDADES_VALIDAS = ["baja", "media", "alta", "critica"];

async function getAll(filtros = {}) {
  const where = {};
  const { proyectoId, responsableId, estado, prioridad, page, limit, sortBy, order, search } = filtros;

  if (proyectoId) where.proyectoId = proyectoId;
  if (responsableId) where.responsableId = responsableId;
  if (estado) where.estado = estado;
  if (prioridad) where.prioridad = prioridad;
  if (search) {
    where.titulo = { [Op.like]: `%${search}%` };
  }

  const camposOrdenables = ["id", "titulo", "prioridad", "estado", "fechaLimite", "createdAt"];
  const orden = [];

  if (sortBy && camposOrdenables.includes(sortBy)) {
    if (sortBy === "prioridad") {
      const dir = order === "DESC" ? "DESC" : "ASC";
      orden.push([
        literal(`CASE prioridad
          WHEN 'baja'    THEN 1
          WHEN 'media'   THEN 2
          WHEN 'alta'    THEN 3
          WHEN 'critica' THEN 4
          END`),
        dir
      ]);
    } else {
      orden.push([sortBy, order === "DESC" ? "DESC" : "ASC"]);
    }
  }

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const offset = (pageNum - 1) * limitNum;

  const { count, rows } = await Tarea.findAndCountAll({
    where,
    include: [
      { model: Proyecto },
      { model: Usuario, as: "responsable" }
    ],
    order: orden.length ? orden : [["createdAt", "DESC"]],
    offset,
    limit: limitNum,
  });

  return {
    data: rows,
    total: count,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(count / limitNum),
  };
}

async function cambiarEstado(tareaId, nuevoEstado, usuarioId) {

  const tarea = await Tarea.findByPk(tareaId);

  if (!tarea) {
    throw new AppError("Tarea no encontrada", 404);
  }

  const estadoAnterior = tarea.estado;

  if (!canTransition(estadoAnterior, nuevoEstado)) {
    throw new AppError(
      `No se puede pasar de ${estadoAnterior} a ${nuevoEstado}`,
      400
    );
  }

  tarea.estado = nuevoEstado;
  await tarea.save();

  await historialService.registrarCambio({
    tareaId: tarea.id,
    usuarioId,
    accion: "CAMBIO_ESTADO",
    valorAnterior: estadoAnterior,
    valorNuevo: nuevoEstado
  });

  return tarea;
}

async function iniciar(tareaId, usuarioId) {
  return cambiarEstado(tareaId, "en_progreso", usuarioId);
}

async function bloquear(tareaId, usuarioId) {
  return cambiarEstado(tareaId, "bloqueada", usuarioId);
}

async function finalizar(tareaId, usuarioId) {
  return cambiarEstado(tareaId, "finalizada", usuarioId);
}

async function cancelar(tareaId, usuarioId) {
  return cambiarEstado(tareaId, "cancelada", usuarioId);
}

async function getHistorial(tareaId) {
  return historialService.obtenerHistorial(tareaId);
}

async function update(id, data, usuarioId) {
  const tarea = await Tarea.findByPk(id, {
    include: [{ model: Proyecto }]
  });

  if (!tarea) {
    throw new AppError("Tarea no encontrada", 404);
  }

  if (tarea.estado === "finalizada" || tarea.estado === "cancelada") {
    throw new AppError("No se puede editar una tarea finalizada o cancelada", 400);
  }

  if (tarea.Proyecto && tarea.Proyecto.estado === "finalizado") {
    throw new AppError("No se puede editar tareas de un proyecto finalizado", 400);
  }

  if (!PRIORIDADES_VALIDAS.includes(data.prioridad)) {
    throw new AppError("Prioridad inválida. Valores permitidos: baja, media, alta, critica", 400);
  }

  const anterior = {
    titulo: tarea.titulo,
    descripcion: tarea.descripcion,
    prioridad: tarea.prioridad,
    fechaLimite: tarea.fechaLimite,
  };

  const cambios = {};
  let huboReasignacion = false;

  if (data.titulo !== undefined) cambios.titulo = data.titulo;
  if (data.descripcion !== undefined) cambios.descripcion = data.descripcion;
  if (data.prioridad !== undefined) cambios.prioridad = data.prioridad;
  if (data.fechaLimite !== undefined) cambios.fechaLimite = data.fechaLimite;

  if (data.responsableId !== undefined && data.responsableId !== tarea.responsableId) {
    const proyecto = tarea.Proyecto || await Proyecto.findByPk(tarea.proyectoId);
    const integrantes = await proyecto.getUsuarios();
    const pertenece = integrantes.some(u => u.id === Number(data.responsableId));
    if (!pertenece) {
      throw new AppError("El responsable no pertenece al proyecto", 400);
    }
    cambios.responsableId = data.responsableId;
    huboReasignacion = true;
  }

  await tarea.update(cambios);

  await historialService.registrarCambio({
    tareaId: tarea.id,
    usuarioId,
    accion: huboReasignacion ? "Reasignacion" : "MODIFICACION",
    valorAnterior: JSON.stringify(anterior),
    valorNuevo: JSON.stringify(cambios),
  });

  return tarea;
}

async function getById(id) {

  const tarea = await Tarea.findByPk(id, {
    include: [
      { model: Proyecto },
      { model: Usuario, as: "responsable" }
    ]
  });

  if (!tarea) {
    throw new AppError("Tarea no encontrada", 404);
  }

  return tarea;
}

async function create(data) {

  if (!PRIORIDADES_VALIDAS.includes(data.prioridad)) {
    throw new AppError("Prioridad inválida. Valores permitidos: baja, media, alta, critica", 400);
  }

  const proyecto = await Proyecto.findByPk(data.proyectoId, {
    include: Usuario
  });

  if (!proyecto) {
    throw new AppError("Proyecto inexistente", 400);
  }

  if (proyecto.estado === "pausado") {
    throw new AppError("No se pueden crear tareas en proyectos pausados", 400);
  }

  if (proyecto.estado === "finalizado") {
    throw new AppError("No se pueden crear tareas en proyectos finalizados", 400);
  }

  const responsable = await Usuario.findByPk(data.responsableId);

  if (!responsable) {
    throw new AppError("Responsable inexistente", 400);
  }

  const integrantes = await proyecto.getUsuarios();
  const pertenece = integrantes.some(usuario => usuario.id === responsable.id);

  if (!pertenece) {
    throw new AppError("El responsable no pertenece al proyecto", 400);
  }

  const tarea = await Tarea.create({
    titulo: data.titulo,
    descripcion: data.descripcion,
    prioridad: data.prioridad,
    fechaLimite: data.fechaLimite,
    proyectoId: data.proyectoId,
    responsableId: data.responsableId,
    estado: "pendiente"
  });

  await historialService.registrarCambio({
    tareaId: tarea.id,
    usuarioId: tarea.responsableId,
    accion: "Creacion",
    valorAnterior: null,
    valorNuevo: JSON.stringify({
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      prioridad: tarea.prioridad,
      estado: tarea.estado,
      fechaLimite: tarea.fechaLimite,
    }),
  });

  return tarea;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  iniciar,
  bloquear,
  finalizar,
  cancelar,
  getHistorial
};