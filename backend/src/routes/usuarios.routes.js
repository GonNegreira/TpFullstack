const express =
  require("express");

const router =
  express.Router();

const controller =
  require(
    "../controllers/usuarios.controller"
  );

const authenticateJWT =
  require(
    "../middlewares/auth.middleware"
  );

router.get(
  "/",
  authenticateJWT,
  controller.getAll
);

router.get(
  "/activos",
  authenticateJWT,
  controller.getActivos
);

router.get(
  "/:id",
  authenticateJWT,
  controller.getById
);

module.exports = router;