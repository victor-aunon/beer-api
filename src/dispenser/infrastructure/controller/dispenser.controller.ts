import { Request, Response } from "express";
import {
  CreateDispenser,
  RemoveDispenser,
  UpdateDispenserStatus,
  GetDispenserSpending,
} from "@app/dispenser/application";
import { costLitre } from "@app/dispenser/domain";
import {
  DispenserAlreadyOpenClosed,
  DispenserDoesNotExist,
  DispenserInUse,
} from "@app/dispenser/domain/errors";
import { dispenserRepository } from "../dependencies";

export class DispenserController {
  constructor(
    private readonly createDispenser = new CreateDispenser(dispenserRepository),
    private readonly removeDispenser = new RemoveDispenser(dispenserRepository),
    private readonly updateDispenser = new UpdateDispenserStatus(
      dispenserRepository
    ),
    private readonly getSpendingDispenser = new GetDispenserSpending(
      dispenserRepository
    )
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { flow_volume: flowLitresPerSecond, cost_litre: costPerLitre } =
        req.body;
      const dispenser = await this.createDispenser.create(
        flowLitresPerSecond,
        costPerLitre ?? costLitre
      );

      res.status(200).json({
        id: dispenser?.id,
        flow_volume: dispenser?.flowVolume,
        cost_litre: dispenser?.costPerLitre,
      });
    } catch (error: any) {
      let status = 500;
      if (error instanceof Error) {
        status = 400;
      }
      res.status(status).json({ error: error.message });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.removeDispenser.remove(id);
      res.status(200).json({ msg: `Dispenser with ID ${id} removed.` });
    } catch (error: any) {
      let status = 500;
      if (error instanceof DispenserDoesNotExist) {
        status = 404;
      } else if (error instanceof DispenserInUse) {
        status = 409;
      } else if (error instanceof Error) {
        status = 400;
      }
      res.status(status).json({ error: error.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { status, updated_at: updatedAt } = req.body;
      const updatedStatus = await this.updateDispenser.update(
        id,
        status,
        updatedAt
      );
      res
        .status(200)
        .json({ msg: `Dispenser with ID ${id} is ${updatedStatus}.` });
    } catch (error: any) {
      let status = 500;
      if (error instanceof DispenserDoesNotExist) {
        status = 404;
      } else if (error instanceof DispenserAlreadyOpenClosed) {
        status = 409;
      } else if (error instanceof Error) {
        status = 400;
      }
      res.status(status).json({ error: error.message });
    }
  }

  async getSpending(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const spending = await this.getSpendingDispenser.getSpending(id);
      res.status(200).json(spending);
    } catch (error: any) {
      let status = 500;
      if (error instanceof DispenserDoesNotExist) {
        status = 404;
      } else if (error instanceof Error) {
        status = 400;
      }
      res.status(status).json({ error: error.message });
    }
  }
}
