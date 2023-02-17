import { Request, Response, Router } from "express";
import { DispenserController } from "@app/dispenser/infrastructure/controller";

const dispenserRouter = Router();
const dispenserController = new DispenserController();

dispenserRouter.post("/api/dispenser", async (req: Request, res: Response) => {
  dispenserController.create(req, res);
});

dispenserRouter.delete(
  "/api/dispenser/:id",
  async (req: Request, res: Response) => {
    dispenserController.remove(req, res);
  }
);

dispenserRouter.put(
  "/api/dispenser/:id/status",
  async (req: Request, res: Response) => {
    dispenserController.updateStatus(req, res);
  }
);

dispenserRouter.get(
  "/api/dispenser/:id/spending",
  async (req: Request, res: Response) => {
    dispenserController.getSpending(req, res);
  }
);

export default dispenserRouter;
