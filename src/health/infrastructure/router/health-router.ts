import { Request, Response, Router } from "express";
import { HealthController } from "../controller/health-controller";

const healthRouter = Router();
const healthController = new HealthController();

healthRouter.get("/api/health", async (req: Request, res: Response) => {
  healthController.health(req, res);
});

export default healthRouter;
