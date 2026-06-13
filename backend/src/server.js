require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database.js");

require("./models");

const seedDatabase = require("./seeds/seed");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {

    await sequelize.authenticate();
    console.log("Base de datos conectada");

    await sequelize.sync();
    console.log("Modelos sincronizados");

    const { Usuario } = require("./models");
    const count = await Usuario.count();

    if (count === 0) {
      console.log("Base de datos vacía, cargando semillas...");
      await seedDatabase();
    } else {
      console.log("Datos existentes encontrados, omitiendo semillas.");
    }

    const server = app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });

    // Fix para Express 5 + Node 24: mantener el event loop activo
    server.keepAliveTimeout = 65000;
    server.headersTimeout = 66000;

    process.on("SIGTERM", () => {
      console.log("Cerrando servidor...");
      server.close(() => process.exit(0));
    });

    process.on("SIGINT", () => {
      console.log("Cerrando servidor...");
      server.close(() => process.exit(0));
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();