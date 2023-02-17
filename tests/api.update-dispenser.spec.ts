import request from "supertest";

import app from "../src/app";

describe("PUT /dispenser/:id/status", () => {
  let dispenserId = "";

  beforeAll(async () => {
    const createResponse = await request(app)
      .post("/api/dispenser")
      .send({ flow_volume: 0.5 });
    dispenserId = createResponse.body.id;
  });

  it("should return Not Found 404 when id does not match any dispenser",
    async () => {
      const response = await request(app)
        .put("/api/dispenser/random/status")
        .send({
          status: "open",
          updated_at: new Date().toISOString(),
        });
    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });

  it("should return Bad Request 400 if status is missing", async () => {
    const response = await request(app)
      .put(`/api/dispenser/${dispenserId}/status`)
      .send({
        updated_at: new Date().toISOString(),
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should return Bad Request 400 if updated_at is missing", async () => {
    const response = await request(app)
      .put(`/api/dispenser/${dispenserId}/status`)
      .send({
        status: "open",
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should return Bad Request 400 if status is invalid", async () => {
    const response = await request(app)
      .put(`/api/dispenser/${dispenserId}/status`)
      .send({
        status: "any",
        updated_at: new Date().toISOString(),
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should return Bad Request 400 if updated_at is invalid", async () => {
    const response = await request(app)
      .put(`/api/dispenser/${dispenserId}/status`)
      .send({
        status: "open",
        updated_at: "any",
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should return Conflict 409 if status is the current status", async () => {
    const response = await request(app)
      .put(`/api/dispenser/${dispenserId}/status`)
      .send({
        status: "closed",
        updated_at: new Date().toISOString(),
      });
    expect(response.status).toBe(409);
    expect(response.body.error).toBeDefined();
  });

  it("should return OK 200 if request body is valid", async () => {
    const response = await request(app)
      .put(`/api/dispenser/${dispenserId}/status`)
      .send({
        status: "open",
        updated_at: new Date().toISOString(),
      });
    expect(response.status).toBe(200);
    expect(response.body.msg).toBeDefined();
  });
});
