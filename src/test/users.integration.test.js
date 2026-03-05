import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";

describe("Test de integración - Users", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("POST /api/usuarios/register debe crear un usuario", async () => {

    const newUser = {
      first_name: "Test",
      last_name: "Integration",
      email: `test${Date.now()}@mail.com`,
      password: "123456"
    };

    const response = await request(app)
      .post("/api/usuarios/register")
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");

  });

});