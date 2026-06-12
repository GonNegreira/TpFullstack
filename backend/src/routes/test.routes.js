const express =
  require("express");

const router =
  express.Router();

const authenticateJWT =
  require("../middlewares/auth.middleware");

router.get(
  "/private",
  authenticateJWT,
  (req, res) => {

    res.json({
      mensaje:
        "Ruta protegida",
      usuario:
        req.user,
    });
  }
);

module.exports = router;