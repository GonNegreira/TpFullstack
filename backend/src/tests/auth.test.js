const { app, request, seedTestData, sequelize } = require("./setup");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await seedTestData();
});

afterAll(async () => {
  await sequelize.close();
});

describe("Auth", () => {

  test("POST /api/auth/login correcto devuelve token y usuario", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@test.com", password: "123456" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.usuario.email).toBe("admin@test.com");
  });

  test("POST /api/auth/login inválido devuelve 401", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@test.com", password: "wrong" });

    expect(res.status).toBe(401);
  });

});
