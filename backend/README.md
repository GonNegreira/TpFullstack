# Backend — TP Full Stack

API REST para seguimiento de tareas en proyectos.

---

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
cd backend
npm install
```

## Ejecución

```bash
npm start        # Inicia el servidor en puerto 3000
npm run dev      # Inicia con nodemon (recarga automática)
```

El servidor crea el archivo `database.sqlite` con datos semilla al iniciar.

## Usuarios de prueba

| Email | Contraseña | Rol |
|---|---|---|
| admin@dds.com | 123456 | admin |
| lider@dds.com | 123456 | lider |
| juan@dds.com | 123456 | colaborador |
| maria@dds.com | 123456 | colaborador |
| pedro@dds.com | 123456 | colaborador |

## Endpoints principales

### Auth
| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | /api/auth/register | No | Registrar usuario (rol: colaborador) |
| POST | /api/auth/login | No | Iniciar sesión, devuelve JWT |

### Tareas
| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | /api/tareas | JWT | Listar tareas (con filtros, paginación y orden) |
| GET | /api/tareas/resumen | JWT + admin | Resumen administrativo |
| GET | /api/tareas/:id | JWT | Detalle de tarea |
| GET | /api/tareas/:id/historial | JWT | Historial de cambios |
| POST | /api/tareas | JWT | Crear tarea |
| PUT | /api/tareas/:id | JWT | Editar tarea |
| PATCH | /api/tareas/:id/iniciar | JWT | Cambiar a en_progreso |
| PATCH | /api/tareas/:id/bloquear | JWT | Cambiar a bloqueada |
| PATCH | /api/tareas/:id/finalizar | JWT + admin/lider | Finalizar tarea |
| PATCH | /api/tareas/:id/cancelar | JWT + admin/lider | Cancelar tarea |

### Proyectos
| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | /api/proyectos | JWT | Listar proyectos |
| GET | /api/proyectos/:id | JWT | Detalle de proyecto |
| POST | /api/proyectos | JWT + admin | Crear proyecto |
| PATCH | /api/proyectos/:id/pausar | JWT + admin | Pausar proyecto |
| PATCH | /api/proyectos/:id/reactivar | JWT + admin | Reactivar proyecto |
| PATCH | /api/proyectos/:id/finalizar | JWT + admin | Finalizar proyecto |

### Dashboard
| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | /api/dashboard | JWT + admin | Resumen general del sistema |

## Filtros, paginación y ordenamiento (GET /api/tareas)

```
 GET /api/tareas?proyectoId=1&responsableId=3&estado=pendiente&prioridad=alta&page=1&limit=10&sortBy=fechaLimite&order=ASC
```

| Parámetro | Tipo | Ejemplo |
|---|---|---|
| proyectoId | number | 1 |
| responsableId | number | 3 |
| estado | string | pendiente, en_progreso, bloqueada, finalizada, cancelada |
| prioridad | string | baja, media, alta, critica |
| page | number | 1 |
| limit | number | 10 |
| sortBy | string | id, titulo, prioridad, estado, fechaLimite, createdAt |
| order | string | ASC o DESC |

## Reglas de negocio

### Responsable válido
Una tarea solo puede asignarse a un usuario que sea integrante del proyecto al que pertenece la tarea.

### Prioridades válidas
`baja`, `media`, `alta`, `critica`

### Estados y transiciones permitidas
```
pendiente  →  en_progreso, cancelada
en_progreso →  bloqueada, finalizada, cancelada
bloqueada  →  en_progreso, cancelada
finalizada →  (ninguna)
cancelada  →  (ninguna)
```

### Proyectos
```
activo    →  pausado, finalizado
pausado   →  activo, finalizado
finalizado →  (ninguna)
```

- No se pueden crear tareas en proyectos **pausados** ni **finalizados**.
- No se pueden editar tareas de proyectos **finalizados**.
- No se pueden editar tareas **finalizadas** ni **canceladas**.

## JWT, roles y permisos

### JWT
- Se envía como `Authorization: Bearer <token>`.
- El payload contiene: `id`, `email`, `rol`.
- Expira en 24 horas.

### Roles
| Rol | Permisos |
|---|---|
| admin | Crear/editar proyectos, crear/editar cualquier tarea, iniciar/bloquear/finalizar/cancelar cualquier tarea, acceder al resumen |
| lider | Crear/editar tareas, iniciar/bloquear/finalizar/cancelar cualquier tarea del proyecto |
| colaborador | Ver tareas asignadas, iniciar/bloquear solo sus propias tareas, editar descripción |

## Tests

```bash
npm test
```

Los tests usan SQLite en memoria. No afectan la base de datos de desarrollo.

Casos cubiertos:
- Login correcto e inválido
- Listado de tareas con y sin filtros
- Detalle de tarea existente e inexistente
- Creación válida de tarea
- Creación inválida por responsable fuera del proyecto
- Creación inválida por prioridad no permitida
- Creación inválida sobre proyecto finalizado
- Creación inválida sobre proyecto pausado
- Acceso sin JWT a ruta protegida (401)
- Colaborador no puede finalizar tarea (403)
- Transición de estado no permitida

## Tecnologías

- Node.js + Express 5
- Sequelize + SQLite
- JWT (jsonwebtoken)
- bcrypt
- Jest + Supertest (tests)

## Limitaciones conocidas

- El ordenamiento por prioridad usa orden alfabético, no el orden lógico (critica > alta > media > baja).
- No hay verificación de usuario activo en el middleware JWT (solo se verifica el token).
- No hay endpoints de recuperación de contraseña.
