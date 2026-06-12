const express =
  require("express");

const router =
  express.Router();

const controller =
  require("../controllers/tareas.controller");

const authenticateJWT =
  require("../middlewares/auth.middleware");

const authorize = require("../middlewares/authorize.middleware");

const autorizarTarea = require("../middlewares/autorizarTarea.middleware");

const tareaValidator =
  require("../validators/validateTarea.middleware");

const dashboardController =
  require("../controllers/dashboard.controller");

router.get(
  "/",
  authenticateJWT,
  controller.getAll
);

router.get(
  "/resumen",
  authenticateJWT,
  authorize("admin"),
  dashboardController.resumen
);

router.get(
  "/:id",
  authenticateJWT,
  controller.getById
);

router.post(
  "/",
  authenticateJWT,
  tareaValidator.validateCreateTarea,
  controller.create
);

router.put(
  "/:id",
  authenticateJWT,
  tareaValidator.validateUpdateTarea,
  controller.update
);

router.patch("/:id/iniciar", authenticateJWT, autorizarTarea, controller.iniciar);
router.patch("/:id/bloquear", authenticateJWT, autorizarTarea, controller.bloquear);
router.patch("/:id/finalizar", authenticateJWT, autorizarTarea, authorize("admin", "lider"), controller.finalizar);
router.patch("/:id/cancelar", authenticateJWT, autorizarTarea, authorize("admin", "lider"), controller.cancelar);

router.get(
  "/:id/historial",
  authenticateJWT,
  controller.historial
);

module.exports = router;