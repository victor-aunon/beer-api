import request from "supertest";
import { costLitre } from "@app/dispenser/domain";

import app from "../src/app";

describe("POST /dispenser", () => {
  it("should return Bad Request 400 when flow_volume is missing", async () => {
    const response = await request(app).post("/api/dispenser").send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should return OK 200 when flow_volume is in the request body", async () => {
    const response = await request(app)
      .post("/api/dispenser")
      .send({ flow_volume: 0.5 });
    expect(response.status).toBe(200);
    expect(response.body.flow_volume).toBe(0.5);
    expect(response.body.cost_litre).toBe(costLitre);
  });
});
