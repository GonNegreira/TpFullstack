const proyectosService =
  require(
    "../services/proyectos.service"
  );

async function getAll(
  req,
  res,
  next
) {

  try {

    const proyectos =
      await proyectosService.getAll();

    res.json(proyectos);

  } catch (error) {

    next(error);

  }

}

async function getById(
  req,
  res,
  next
) {

  try {

    const proyecto =
      await proyectosService.getById(
        req.params.id
      );

    res.json(proyecto);

  } catch (error) {

    next(error);

  }

}

async function create(
  req,
  res,
  next
) {

  try {

    const proyecto =
      await proyectosService.create(
        req.body
      );

    res
      .status(201)
      .json(proyecto);

  } catch (error) {

    next(error);

  }

}

async function pausar(
  req,
  res,
  next
) {

  try {

    const proyecto =
      await proyectosService
        .pausar(
          req.params.id
        );

    res.json(proyecto);

  } catch (error) {

    next(error);

  }

}

async function reactivar(
  req,
  res,
  next
) {

  try {

    const proyecto =
      await proyectosService
        .reactivar(
          req.params.id
        );

    res.json(proyecto);

  } catch (error) {

    next(error);

  }

}

async function finalizar(
  req,
  res,
  next
) {

  try {

    const proyecto =
      await proyectosService
        .finalizar(
          req.params.id
        );

    res.json(proyecto);

  } catch (error) {

    next(error);

  }

}

async function estadisticas(
  req,
  res,
  next
) {

  try {

    const estadisticas =
      await proyectosService.getEstadisticas(
        req.params.id
      );

    res.json(
      estadisticas
    );

  } catch (error) {

    next(error);

  }

}

async function update(
  req,
  res,
  next
) {

  try {

    const proyecto =
      await proyectosService.update(
        req.params.id,
        req.body
      );

    res.json(proyecto);

  } catch (error) {

    next(error);

  }

}

async function remove(
  req,
  res,
  next
) {

  try {

    const resultado =
      await proyectosService.remove(
        req.params.id
      );

    res.json(resultado);

  } catch (error) {

    next(error);

  }

}

async function setIntegrantes(
  req,
  res,
  next
) {

  try {

    const proyecto =
      await proyectosService.setIntegrantes(
        req.params.id,
        req.body.integrantes
      );

    res.json(proyecto);

  } catch (error) {

    next(error);

  }

}

module.exports = {

  getAll,

  getById,

  create,

  update,

  remove,

  estadisticas,

  pausar,

  reactivar,

  finalizar,

  setIntegrantes

};
