const Usuario = require("./Usuario");
const Proyecto = require("./Proyecto");
const Tarea = require("./Tarea");
const HistorialTarea = require("./HistorialTarea");


// ======================================
// USUARIOS <-> PROYECTOS
// ======================================

Usuario.belongsToMany(Proyecto, {
  through: "ProyectoUsuarios",
  foreignKey: "usuarioId",
});

Proyecto.belongsToMany(Usuario, {
  through: "ProyectoUsuarios",
  foreignKey: "proyectoId",
});


// ======================================
// PROYECTO -> TAREAS
// ======================================

Proyecto.hasMany(Tarea, {
  foreignKey: "proyectoId",
});

Tarea.belongsTo(Proyecto, {
  foreignKey: "proyectoId",
});


// ======================================
// RESPONSABLE DE TAREA
// ======================================

Usuario.hasMany(Tarea, {
  foreignKey: "responsableId",
});

Tarea.belongsTo(Usuario, {
  as: "responsable",
  foreignKey: "responsableId",
});


// ======================================
// TAREA -> HISTORIAL
// ======================================

Tarea.hasMany(HistorialTarea, {
  foreignKey: "tareaId",
});

HistorialTarea.belongsTo(Tarea, {
  foreignKey: "tareaId",
});


// ======================================
// USUARIO QUE REALIZÓ EL CAMBIO
// ======================================

Usuario.hasMany(HistorialTarea, {
  foreignKey: "usuarioId",
});

HistorialTarea.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

module.exports = {
  Usuario,
  Proyecto,
  Tarea,
  HistorialTarea,
};