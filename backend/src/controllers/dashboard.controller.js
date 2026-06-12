const { Op } = require("sequelize");
const { Proyecto, Tarea, Usuario } = require("../models");

async function resumen(req, res, next) {
  try {
    const totalProyectos = await Proyecto.count();
    const totalUsuarios = await Usuario.count();

    const tareas = await Tarea.findAll({
      include: [{ model: Usuario, as: "responsable" }]
    });

    const ahora = new Date();

    const tareasVencidas = tareas.filter(t =>
      new Date(t.fechaLimite) < ahora &&
      t.estado !== "finalizada" &&
      t.estado !== "cancelada"
    );

    const tareasCriticas = tareas.filter(t => t.prioridad === "critica");

    const tareasPorResponsable = {};
    for (const t of tareas) {
      const nombre = t.responsable ? t.responsable.nombre : "Sin responsable";
      if (!tareasPorResponsable[nombre]) tareasPorResponsable[nombre] = 0;
      tareasPorResponsable[nombre]++;
    }

    res.json({
      totalProyectos,
      totalUsuarios,
      totalTareas: tareas.length,
      tareasPorEstado: {
        pendiente: tareas.filter(t => t.estado === "pendiente").length,
        en_progreso: tareas.filter(t => t.estado === "en_progreso").length,
        bloqueada: tareas.filter(t => t.estado === "bloqueada").length,
        finalizada: tareas.filter(t => t.estado === "finalizada").length,
        cancelada: tareas.filter(t => t.estado === "cancelada").length,
      },
      tareasVencidas: {
        cantidad: tareasVencidas.length,
        tareas: tareasVencidas.map(t => ({
          id: t.id,
          titulo: t.titulo,
          fechaLimite: t.fechaLimite,
          estado: t.estado,
          responsable: t.responsable ? t.responsable.nombre : null,
        })),
      },
      tareasCriticas: {
        cantidad: tareasCriticas.length,
        tareas: tareasCriticas.map(t => ({
          id: t.id,
          titulo: t.titulo,
          estado: t.estado,
          responsable: t.responsable ? t.responsable.nombre : null,
        })),
      },
      tareasPorResponsable,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { resumen };