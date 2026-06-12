const express =
  require("express");

const router =
  express.Router();

const controller =
  require(
    "../controllers/dashboard.controller"
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
  authorize("admin"),
  controller.resumen
);

module.exports =
  router;