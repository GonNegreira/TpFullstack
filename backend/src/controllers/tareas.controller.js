const tareasService =
  require("../services/tareas.service");

async function getAll(req, res, next) {
  try {
    const tareas =
      await tareasService.getAll(req.query);
    res.json(tareas);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const tarea =
      await tareasService.getById(req.params.id);
    res.json(tarea);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const tarea =
      await tareasService.create(req.body);
    res.status(201).json(tarea);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const tarea =
      await tareasService.update(
        req.params.id,
        req.body,
        req.user.id
      );
    res.json(tarea);
  } catch (error) {
    next(error);
  }
}

async function iniciar(req, res, next) {
  try {
    const tarea =
      await tareasService.iniciar(
        req.params.id,
        req.user.id
      );
    res.json(tarea);
  } catch (error) {
    next(error);
  }
}

async function bloquear(req, res, next) {
  try {
    const tarea =
      await tareasService.bloquear(
        req.params.id,
        req.user.id
      );
    res.json(tarea);
  } catch (error) {
    next(error);
  }
}

async function finalizar(req, res, next) {
  try {
    const tarea =
      await tareasService.finalizar(
        req.params.id,
        req.user.id
      );
    res.json(tarea);
  } catch (error) {
    next(error);
  }
}

async function cancelar(req, res, next) {
  try {
    const tarea =
      await tareasService.cancelar(
        req.params.id,
        req.user.id
      );
    res.json(tarea);
  } catch (error) {
    next(error);
  }
}

async function historial(req, res, next) {
  try {
    const resultado =
      await tareasService.getHistorial(req.params.id);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
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
  historial
};