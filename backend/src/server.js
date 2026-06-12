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

    await sequelize.sync({force: true});

    console.log("Modelos sincronizados");

    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }

  
}

startServer();