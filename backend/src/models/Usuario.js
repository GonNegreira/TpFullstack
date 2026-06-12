const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rol: {
      type: DataTypes.ENUM(
        "admin",
        "lider",
        "colaborador"
      ),
      allowNull: false,
    },

    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

module.exports = Usuario;