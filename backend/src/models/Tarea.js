const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tarea = sequelize.define(
  "Tarea",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    prioridad: {
      type: DataTypes.ENUM(
        "baja",
        "media",
        "alta",
        "critica"
      ),
      allowNull: false,
    },

    estado: {
      type: DataTypes.ENUM(
        "pendiente",
        "en_progreso",
        "bloqueada",
        "finalizada",
        "cancelada"
      ),
      allowNull: false,
      defaultValue: "pendiente",
    },

    fechaLimite: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "tareas",

    timestamps: true,

    createdAt: true,

    updatedAt: false,
  }
);

module.exports = Tarea;