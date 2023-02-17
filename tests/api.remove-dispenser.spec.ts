import request from "supertest";

import app from "../src/app";

describe("GET /dispenser/:id/spending", () => {
  async function createDispenser(): Promise<UniqueId> {
    const createResponse = await request(app)
      .post("/api/dispenser")
      .send({ flow_volume: 0.5 });
    return createResponse.body.id as string;
  }

  it("should return Not Found 404 when id does not match any dispenser",
    async () => {
      const response = await request(app).delete("/api/dispenser/random");
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
  });

  it("should return Conflict 409 when trying to remove a dispenser in use", 
    async () => {
      // First create a dispenser
      const id = await createDispenser();
      // Open the dispenser
      await request(app)
        .put(`/api/dispenser/${id}/status`)
        .send({
          status: "open",
          updated_at: new Date().toISOString(),
        });

      const deleteResponse = await request(app).delete(`/api/dispenser/${id}`);
      expect(deleteResponse.status).toBe(409);
      expect(deleteResponse.body.error).toBeDefined();
  });

  it("should return OK 200 when id matches an existing dispenser", async () => {
    // First create a dispenser
    const id = await createDispenser();

    const deleteResponse = await request(app).delete(`/api/dispenser/${id}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.msg).toBeDefined();
  });
});
