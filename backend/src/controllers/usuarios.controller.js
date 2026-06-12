const usuariosService =
  require(
    "../services/usuarios.service"
  );

async function getAll(
  req,
  res,
  next
) {

  try {

    const usuarios =
      await usuariosService.getAll();

    res.json(
      usuarios
    );

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

    const usuario =
      await usuariosService.getById(
        req.params.id
      );

    res.json(
      usuario
    );

  } catch (error) {

    next(error);

  }

}

async function getActivos(
  req,
  res,
  next
) {

  try {

    const usuarios =
      await usuariosService.getActivos();

    res.json(
      usuarios
    );

  } catch (error) {

    next(error);

  }

}

module.exports = {

  getAll,

  getById,

  getActivos

};