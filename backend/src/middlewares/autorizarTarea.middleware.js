const { Tarea } = require("../models");

async function autorizarTarea(req, res, next) {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    if (req.user.rol === "admin" || req.user.rol === "lider") {
      req.tarea = tarea;
      return next();
    }

    if (req.user.rol === "colaborador" && Number(req.user.id) === tarea.responsableId) {
      req.tarea = tarea;
      return next();
    }

    return res.status(403).json({ error: "No tiene permisos para modificar esta tarea" });
  } catch (error) {
    next(error);
  }
}

module.exports = autorizarTarea;