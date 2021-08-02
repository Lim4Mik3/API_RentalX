import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create category controlle", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
    values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'XXXXX', 'now()')
    `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin",
    });

    console.log(responseToken.body);

    const response = await request(app).post("/categories").send({
      name: "Category SUPERTEST",
      description: "Categories in the supertest",
    });

    expect(response.status).toBe(201);
  });
});
