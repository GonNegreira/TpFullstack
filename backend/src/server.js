require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database.js");

require("./models");

const seedDatabase = require("./seeds/seed");

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("Base de datos conectada");

    await sequelize.sync({ alter: false });

    console.log("Modelos sincronizados");

    const { Usuario } = require("./models");
    const count = await Usuario.count();

    if (count === 0) {
      console.log("Base de datos vacía, cargando semillas...");
      await seedDatabase();
    } else {
      console.log("Datos existentes encontrados, omitiendo semillas.");
    }

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
}

startServer();