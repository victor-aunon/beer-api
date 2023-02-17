/// <reference path="../typings/shared.d.ts" />
import request from "supertest";

import app from "../src/app";

describe("GET /dispenser/:id/spending", () => {
  const flowVolume = 0.05;
  const costPerLitre = 11;
  let dispenserId = "";

  async function updateDispenser(status: string, updatedAt: DateTimeString) {
    await request(app).put(`/api/dispenser/${dispenserId}/status`).send({
      status,
      updated_at: updatedAt,
    });
  }

  beforeAll(async () => {
    const createResponse = await request(app)
      .post("/api/dispenser")
      .send({ flow_volume: flowVolume, cost_litre: costPerLitre });
    dispenserId = createResponse.body.id;
  });

  it("should return Not Found 404 when id does not match any dispenser",
    async () => {
      const response = await request(app).get("/api/dispenser/random/spending");
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
  });

  it("should return OK 200 and zero usages", async () => {
    const response = await request(app).get(
      `/api/dispenser/${dispenserId}/spending`
    );

    expect(response.status).toBe(200);
    expect(response.body.amount).toBe(0.0);
    expect(response.body.usages).toHaveLength(0);
  });

  it("should return OK 200 and one usage when dispenser is open", async () => {
    // Open the dispenser
    await updateDispenser("open", "2023-02-11T14:30:00Z");
    const response = await request(app).get(
      `/api/dispenser/${dispenserId}/spending`
    );

    expect(response.status).toBe(200);
    expect(response.body.amount).toBeGreaterThan(0.0);
    expect(response.body.usages).toHaveLength(1);
  });

  it("should return OK 200 and one usage after 30 seconds",
    async () => {
      // Close the dispenser 30 seconds later
      await updateDispenser("closed", "2023-02-11T14:30:30Z");
      const response = await request(app).get(
        `/api/dispenser/${dispenserId}/spending`
      );

      expect(response.status).toBe(200);
      expect(response.body.amount).toBe(flowVolume * 30 * costPerLitre);
      expect(response.body.usages).toHaveLength(1);
  });

  it("should return OK 200 and two usages after 45 seconds",
    async () => {
      // Open the dispenser again
      await updateDispenser("open", "2023-02-11T14:31:00Z");
      // Close the dispenser 45 seconds later
      await updateDispenser("closed", "2023-02-11T14:31:45Z");
      const response = await request(app).get(
        `/api/dispenser/${dispenserId}/spending`
      );

      expect(response.status).toBe(200);
      expect(response.body.amount).toBe(flowVolume * (45 + 30) * costPerLitre);
      expect(response.body.usages).toHaveLength(2);
  });
});
