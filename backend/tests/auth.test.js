import request from "supertest";
import app from "../server.js";

describe("Authentication Testing", () => {

  test("Login Success", async () => {

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@gmail.com",
        password: "Admin123"
      });

    expect(res.statusCode).toBe(200);
  });

});