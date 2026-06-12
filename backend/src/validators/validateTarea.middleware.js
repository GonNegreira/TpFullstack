const AppError =
  require("../utils/AppError");

const PRIORIDADES_VALIDAS = [
  "baja",
  "media",
  "alta",
  "critica"
];

const ESTADOS_VALIDOS = [
  "pendiente",
  "en_progreso",
  "bloqueada",
  "finalizada",
  "cancelada"
];

function validateCreateTarea(
  req,
  res,
  next
) {

  const {
    titulo,
    descripcion,
    proyectoId,
    responsableId,
    prioridad,
    fechaLimite
  } = req.body;

  const errores = [];

  if (!titulo || typeof titulo !== "string") {
    errores.push("El campo titulo es obligatorio");
  }

  if (!descripcion || typeof descripcion !== "string") {
    errores.push("El campo descripcion es obligatorio");
  }

  if (!proyectoId) {
    errores.push("El campo proyectoId es obligatorio");
  }

  if (!responsableId) {
    errores.push("El campo responsableId es obligatorio");
  }

  if (!prioridad) {
    errores.push("El campo prioridad es obligatorio");
  } else if (
    !PRIORIDADES_VALIDAS.includes(
      prioridad
    )
  ) {
    errores.push(
      "Prioridad inválida. Valores permitidos: baja, media, alta, critica"
    );
  }

  if (!fechaLimite) {
    errores.push("El campo fechaLimite es obligatorio");
  }

  if (errores.length > 0) {
    return res.status(400).json({
      error: errores.join(". ")
    });
  }

  next();

}

function validateUpdateTarea(
  req,
  res,
  next
) {

  const {
    titulo,
    descripcion,
    prioridad,
    fechaLimite
  } = req.body;

  const errores = [];

  if (
    titulo !== undefined &&
    typeof titulo !== "string"
  ) {
    errores.push("El campo titulo debe ser un texto");
  }

  if (
    descripcion !== undefined &&
    typeof descripcion !== "string"
  ) {
    errores.push("El campo descripcion debe ser un texto");
  }

  if (
    prioridad !== undefined &&
    !PRIORIDADES_VALIDAS.includes(
      prioridad
    )
  ) {
    errores.push(
      "Prioridad inválida. Valores permitidos: baja, media, alta, critica"
    );
  }

  if (
    fechaLimite !== undefined &&
    isNaN(
      Date.parse(
        fechaLimite
      )
    )
  ) {
    errores.push("El campo fechaLimite debe ser una fecha válida");
  }

  if (errores.length > 0) {
    return res.status(400).json({
      error: errores.join(". ")
    });
  }

  next();

}

module.exports = {
  validateCreateTarea,
  validateUpdateTarea
};