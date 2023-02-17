import { Request, Response } from "express";

export class HealthController {
  async health(req: Request, res: Response) {
    res.status(200).send("Healthy");
  }
}
