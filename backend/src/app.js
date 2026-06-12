const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const tareasRoutes = require("./routes/tareas.routes");
const proyectosRoutes = require("./routes/proyectos.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/tareas", tareasRoutes);
app.use("/api/proyectos", proyectosRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorHandler);

module.exports = app;