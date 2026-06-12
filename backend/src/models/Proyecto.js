const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Proyecto = sequelize.define(
  "Proyecto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    estado: {
      type: DataTypes.ENUM(
        "activo",
        "pausado",
        "finalizado"
      ),
      allowNull: false,
    },
  },
  {
    tableName: "proyectos",
    timestamps: false,
  }
);

module.exports = Proyecto;