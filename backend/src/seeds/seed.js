const bcrypt = require("bcrypt");

const {
  Usuario,
  Proyecto,
  Tarea,
  HistorialTarea,
} = require("../models");

async function seedDatabase() {

  console.log("Iniciando carga de semillas...");

  // ==========================================
  // LIMPIEZA
  // ==========================================

  await Tarea.destroy({ where: {}, force: true });

  await Proyecto.destroy({ where: {}, force: true });

  await Usuario.destroy({ where: {}, force: true });

  // ==========================================
  // USUARIOS
  // ==========================================

  const passwordHash = await bcrypt.hash(
    "123456",
    10
  );

  const usuarios = await Usuario.bulkCreate([
    {
      nombre: "Administrador",
      email: "admin@dds.com",
      passwordHash,
      rol: "admin",
      activo: true,
    },
    {
      nombre: "Lider Proyecto",
      email: "lider@dds.com",
      passwordHash,
      rol: "lider",
      activo: true,
    },
    {
      nombre: "Juan Perez",
      email: "juan@dds.com",
      passwordHash,
      rol: "colaborador",
      activo: true,
    },
    {
      nombre: "Maria Gomez",
      email: "maria@dds.com",
      passwordHash,
      rol: "colaborador",
      activo: true,
    },
    {
      nombre: "Pedro Lopez",
      email: "pedro@dds.com",
      passwordHash,
      rol: "colaborador",
      activo: true,
    }
  ]);

  // ==========================================
  // PROYECTOS
  // ==========================================

  const proyectos = await Proyecto.bulkCreate([
    {
      codigo: "DDS-001",
      nombre: "Portal Académico",
      descripcion: "Sistema académico",
      estado: "activo"
    },
    {
      codigo: "DDS-002",
      nombre: "API Biblioteca",
      descripcion: "Sistema biblioteca",
      estado: "activo"
    },
    {
      codigo: "DDS-003",
      nombre: "Sistema RRHH",
      descripcion: "Proyecto pausado",
      estado: "pausado"
    },
    {
      codigo: "DDS-004",
      nombre: "Sistema Legacy",
      descripcion: "Proyecto finalizado",
      estado: "finalizado"
    }
  ]);

  // ==========================================
  // INTEGRANTES
  // ==========================================

  await proyectos[0].addUsuarios([
    usuarios[0],
    usuarios[1],
    usuarios[2],
    usuarios[3]
  ]);

  await proyectos[1].addUsuarios([
    usuarios[0],
    usuarios[1],
    usuarios[3],
    usuarios[4]
  ]);

  await proyectos[2].addUsuarios([
    usuarios[1],
    usuarios[2],
    usuarios[4]
  ]);

  await proyectos[3].addUsuarios([
    usuarios[0],
    usuarios[1]
  ]);

  // ==========================================
  // TAREAS
  // ==========================================

  const tareasCreadas = await Tarea.bulkCreate([
    {
      proyectoId: proyectos[0].id,
      responsableId: usuarios[2].id,
      titulo: "Implementar Login",
      descripcion: "Crear login JWT",
      prioridad: "alta",
      estado: "pendiente",
      fechaLimite: "2026-06-20"
    },
    {
      proyectoId: proyectos[0].id,
      responsableId: usuarios[3].id,
      titulo: "Crear Dashboard",
      descripcion: "Vista principal",
      prioridad: "media",
      estado: "en_progreso",
      fechaLimite: "2026-06-25"
    },
    {
      proyectoId: proyectos[0].id,
      responsableId: usuarios[2].id,
      titulo: "Configurar Axios",
      descripcion: "Servicios frontend",
      prioridad: "baja",
      estado: "bloqueada",
      fechaLimite: "2026-06-22"
    },
    {
      proyectoId: proyectos[0].id,
      responsableId: usuarios[3].id,
      titulo: "CRUD Usuarios",
      descripcion: "ABM usuarios",
      prioridad: "alta",
      estado: "finalizada",
      fechaLimite: "2026-06-10"
    },
    {
      proyectoId: proyectos[0].id,
      responsableId: usuarios[2].id,
      titulo: "Refactor Navbar",
      descripcion: "Mejorar navegación",
      prioridad: "media",
      estado: "cancelada",
      fechaLimite: "2026-06-15"
    },
    {
      proyectoId: proyectos[1].id,
      responsableId: usuarios[4].id,
      titulo: "Endpoint Libros",
      descripcion: "GET libros",
      prioridad: "alta",
      estado: "pendiente",
      fechaLimite: "2026-06-30"
    },
    {
      proyectoId: proyectos[1].id,
      responsableId: usuarios[3].id,
      titulo: "Swagger",
      descripcion: "Documentación API",
      prioridad: "media",
      estado: "en_progreso",
      fechaLimite: "2026-06-28"
    },
    {
      proyectoId: proyectos[1].id,
      responsableId: usuarios[4].id,
      titulo: "JWT Biblioteca",
      descripcion: "Seguridad",
      prioridad: "critica",
      estado: "bloqueada",
      fechaLimite: "2026-06-12"
    },
    {
      proyectoId: proyectos[1].id,
      responsableId: usuarios[3].id,
      titulo: "Roles API",
      descripcion: "Permisos",
      prioridad: "alta",
      estado: "finalizada",
      fechaLimite: "2026-06-08"
    },
    {
      proyectoId: proyectos[1].id,
      responsableId: usuarios[4].id,
      titulo: "Dockerización",
      descripcion: "Deploy",
      prioridad: "media",
      estado: "cancelada",
      fechaLimite: "2026-06-11"
    },
    {
      proyectoId: proyectos[2].id,
      responsableId: usuarios[2].id,
      titulo: "RRHH Login",
      descripcion: "Login empleados",
      prioridad: "alta",
      estado: "pendiente",
      fechaLimite: "2026-06-27"
    },
    {
      proyectoId: proyectos[2].id,
      responsableId: usuarios[4].id,
      titulo: "Legajos",
      descripcion: "CRUD legajos",
      prioridad: "critica",
      estado: "en_progreso",
      fechaLimite: "2026-06-18"
    },
    {
      proyectoId: proyectos[2].id,
      responsableId: usuarios[2].id,
      titulo: "Reportes",
      descripcion: "PDF",
      prioridad: "media",
      estado: "bloqueada",
      fechaLimite: "2026-06-21"
    },
    {
      proyectoId: proyectos[3].id,
      responsableId: usuarios[0].id,
      titulo: "Migración",
      descripcion: "Proyecto legado",
      prioridad: "alta",
      estado: "finalizada",
      fechaLimite: "2026-05-01"
    },
    {
      proyectoId: proyectos[3].id,
      responsableId: usuarios[1].id,
      titulo: "Documentación Final",
      descripcion: "Cerrar proyecto",
      prioridad: "media",
      estado: "finalizada",
      fechaLimite: "2026-05-05"
    }
  ]);

  const historialEntries = tareasCreadas.map(t => ({
    tareaId: t.id,
    usuarioId: t.responsableId,
    accion: "Creacion",
    valorAnterior: null,
    valorNuevo: JSON.stringify({
      titulo: t.titulo,
      descripcion: t.descripcion,
      prioridad: t.prioridad,
      estado: t.estado,
      fechaLimite: t.fechaLimite,
    }),
    fechaHora: new Date(),
  }));

  await HistorialTarea.bulkCreate(historialEntries);

  console.log("Semillas cargadas correctamente");
}

module.exports = seedDatabase;