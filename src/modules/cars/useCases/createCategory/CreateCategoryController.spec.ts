import request from "supertest";

import { app } from "@shared/infra/app";

describe("Create category controlle", () => {
  it("Should be able to create a new category", async () => {
    const response = await request(app).get("/categories").send({
      name: "Category SUPERTEST",
      description: "Categories in the supertest",
    });

    expect(response.status).toBe(201);
  });
});
