import { Dispenser } from "../Dispenser";
import type { InMemoryUsage } from "@app/dispenser/infrastructure/schema";

export interface GetSpending {
  amount: number,
  usages: InMemoryUsage[]
}

export interface DispenserRepository {
  create(dispenser: Dispenser): Promise<void>;
  remove(id: UniqueId): Promise<void>;
  updateStatus(
    id: UniqueId,
    status: DispenserStatus,
    updatedAt: DateTimeString
  ): Promise<DispenserStatus | void>;
  getSpending(id: UniqueId): Promise<GetSpending | void>;
}
