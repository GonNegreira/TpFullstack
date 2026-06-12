const bcrypt = require("bcrypt");
const {
  Usuario,
  Proyecto,
  Tarea,
  HistorialTarea
} = require("../models");

async function seedTestData() {
  await HistorialTarea.destroy({ where: {}, force: true });
  await Tarea.destroy({ where: {}, force: true });
  await Proyecto.destroy({ where: {}, force: true });
  await Usuario.destroy({ where: {}, force: true });

  const hash = await bcrypt.hash("123456", 10);

  const usuarios = await Usuario.bulkCreate([
    { nombre: "Admin Test", email: "admin@test.com", passwordHash: hash, rol: "admin", activo: true },
    { nombre: "Lider Test", email: "lider@test.com", passwordHash: hash, rol: "lider", activo: true },
    { nombre: "Colab Test", email: "colab@test.com", passwordHash: hash, rol: "colaborador", activo: true },
    { nombre: "Externo Test", email: "externo@test.com", passwordHash: hash, rol: "colaborador", activo: true }
  ]);

  const proyectos = await Proyecto.bulkCreate([
    { codigo: "TEST-001", nombre: "Test Activo", descripcion: "Proyecto activo", estado: "activo" },
    { codigo: "TEST-002", nombre: "Test Pausado", descripcion: "Proyecto pausado", estado: "pausado" },
    { codigo: "TEST-003", nombre: "Test Finalizado", descripcion: "Proyecto finalizado", estado: "finalizado" }
  ]);

  await proyectos[0].addUsuarios([usuarios[0], usuarios[1], usuarios[2]]);
  await proyectos[1].addUsuarios([usuarios[0], usuarios[1]]);
  await proyectos[2].addUsuarios([usuarios[0]]);

  const tareas = await Tarea.bulkCreate([
    { proyectoId: proyectos[0].id, responsableId: usuarios[2].id, titulo: "Tarea 1", descripcion: "Desc 1", prioridad: "alta", estado: "pendiente", fechaLimite: "2026-07-01" },
    { proyectoId: proyectos[0].id, responsableId: usuarios[2].id, titulo: "Tarea 2", descripcion: "Desc 2", prioridad: "media", estado: "en_progreso", fechaLimite: "2026-07-15" },
    { proyectoId: proyectos[0].id, responsableId: usuarios[1].id, titulo: "Tarea 3", descripcion: "Desc 3", prioridad: "critica", estado: "finalizada", fechaLimite: "2026-06-01" }
  ]);

  return { usuarios, proyectos, tareas };
}

function getToken(usuario) {
  const { generateToken } = require("../utils/jwt");
  return generateToken(usuario);
}

module.exports = { seedTestData, getToken };
