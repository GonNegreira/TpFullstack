const express =
  require("express");

const router =
  express.Router();

const controller =
  require(
    "../controllers/proyectos.controller"
  );

const authenticateJWT =
  require(
    "../middlewares/auth.middleware"
  );

const authorize =
  require(
    "../middlewares/authorize.middleware"
  );

router.get(
  "/",
  authenticateJWT,
  controller.getAll
);

router.get(
  "/:id",
  authenticateJWT,
  controller.getById
);

router.post(
  "/",
  authenticateJWT,
  authorize("admin"),
  controller.create
);

router.put(
  "/:id",
  authenticateJWT,
  authorize("admin"),
  controller.update
);

router.delete(
  "/:id",
  authenticateJWT,
  authorize("admin"),
  controller.remove
);

router.patch(
  "/:id/pausar",
  authenticateJWT,
  authorize("admin"),
  controller.pausar
);

router.patch(
  "/:id/reactivar",
  authenticateJWT,
  authorize("admin"),
  controller.reactivar
);

router.patch(
  "/:id/finalizar",
  authenticateJWT,
  authorize("admin"),
  controller.finalizar
);

// Reemplaza todos los integrantes del proyecto
router.patch(
  "/:id/integrantes",
  authenticateJWT,
  authorize("admin"),
  controller.setIntegrantes
);

module.exports = router;
