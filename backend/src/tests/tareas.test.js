const { app, request, seedTestData, sequelize } = require("./setup");
const { getToken } = require("./helpers");

let usuarios, proyectos, tareas, tokenAdmin, tokenColab;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  const data = await seedTestData();
  usuarios = data.usuarios;
  proyectos = data.proyectos;
  tareas = data.tareas;
  tokenAdmin = getToken(usuarios[0]);
  tokenColab = getToken(usuarios[2]);
});

afterAll(async () => {
  await sequelize.close();
});

describe("GET /api/tareas", () => {

  test("listar tareas sin filtros", async () => {
    const res = await request(app)
      .get("/api/tareas")
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(3);
  });

  test("listar tareas con filtro por estado", async () => {
    const res = await request(app)
      .get("/api/tareas?estado=pendiente")
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

});

describe("GET /api/tareas/:id", () => {

  test("detalle de tarea existente", async () => {
    const res = await request(app)
      .get(`/api/tareas/${tareas[0].id}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(200);
    expect(res.body.titulo).toBe("Tarea 1");
  });

  test("detalle de tarea inexistente devuelve 404", async () => {
    const res = await request(app)
      .get("/api/tareas/99999")
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(404);
  });

});

describe("POST /api/tareas", () => {

  const tareaValida = {
    titulo: "Nueva Tarea",
    descripcion: "Descripción",
    proyectoId: null,
    responsableId: null,
    prioridad: "alta",
    fechaLimite: "2026-08-01"
  };

  test("creación válida", async () => {
    const body = {
      ...tareaValida,
      proyectoId: proyectos[0].id,
      responsableId: usuarios[2].id
    };
    const res = await request(app)
      .post("/api/tareas")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(body);

    expect(res.status).toBe(201);
  });

  test("creación inválida por responsable fuera del proyecto", async () => {
    const body = {
      ...tareaValida,
      proyectoId: proyectos[0].id,
      responsableId: usuarios[3].id
    };
    const res = await request(app)
      .post("/api/tareas")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(body);

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("no pertenece");
  });

  test("creación inválida por prioridad no permitida", async () => {
    const body = {
      ...tareaValida,
      proyectoId: proyectos[0].id,
      responsableId: usuarios[2].id,
      prioridad: "superalta"
    };
    const res = await request(app)
      .post("/api/tareas")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(body);

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("Prioridad");
  });

  test("creación inválida sobre proyecto finalizado", async () => {
    const body = {
      ...tareaValida,
      proyectoId: proyectos[2].id,
      responsableId: usuarios[0].id
    };
    const res = await request(app)
      .post("/api/tareas")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(body);

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("finalizado");
  });

  test("creación inválida sobre proyecto pausado", async () => {
    const body = {
      ...tareaValida,
      proyectoId: proyectos[1].id,
      responsableId: usuarios[0].id
    };
    const res = await request(app)
      .post("/api/tareas")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(body);

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("pausado");
  });

});

describe("Autorización", () => {

  test("acceso sin JWT devuelve 401", async () => {
    const res = await request(app)
      .get("/api/tareas");

    expect(res.status).toBe(401);
  });

  test("colaborador no puede finalizar tarea (403)", async () => {
    const res = await request(app)
      .patch(`/api/tareas/${tareas[0].id}/finalizar`)
      .set("Authorization", `Bearer ${tokenColab}`);

    expect(res.status).toBe(403);
  });

});

describe("Transiciones de estado", () => {

  test("transición no permitida: finalizada -> pendiente", async () => {
    const res = await request(app)
      .patch(`/api/tareas/${tareas[2].id}/iniciar`)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("No se puede pasar");
  });

});
