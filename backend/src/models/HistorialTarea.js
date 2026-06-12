const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HistorialTarea = sequelize.define(
  "HistorialTarea",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    accion: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fechaHora: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    valorAnterior: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    valorNuevo: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "historial_tareas",
    timestamps: false,
  }
);

module.exports = HistorialTarea;