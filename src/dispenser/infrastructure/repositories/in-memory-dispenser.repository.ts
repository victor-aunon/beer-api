import { Dispenser } from "@app/dispenser/domain";
import {
  DispenserDoesNotExist,
  DispenserAlreadyExists,
  DispenserAlreadyOpenClosed,
  DispenserInUse
} from "@app/dispenser/domain/errors";
import type { DispenserRepository } from "@app/dispenser/domain/repository";
import type { InMemoryDispenser, InMemoryUsage } from "../schema";

export class InMemoryDispenserRepository implements DispenserRepository {
  private dispensers: Record<UniqueId, Dispenser> = {};

  private fromDomain(dispenser: Dispenser): InMemoryDispenser {
    const usages: InMemoryUsage[] = dispenser.usages.map(usage => ({
      opened_at: usage.openedAt,
      closed_at: usage.closedAt,
      flow_volume: usage.flowVolume,
      total_spent: usage.spent,
    }));

    return {
      id: dispenser.id,
      status: dispenser.status,
      flow_volume: dispenser.flowVolume,
      cost_litre: dispenser.costPerLitre,
      usages,
    };
  }

  private findById(id: UniqueId): Dispenser {
    return this.dispensers[id];
  }

  async create(dispenser: Dispenser): Promise<void> {
    const storedDispenser = this.findById(dispenser.id);
    if (storedDispenser) return DispenserAlreadyExists.throw();

    this.dispensers[dispenser.id] = dispenser;
  }

  async remove(id: string): Promise<void> {
    const storedDispenser = this.findById(id);
    if (!storedDispenser) {
      return DispenserDoesNotExist.throwWithId(id);
    }
    if (storedDispenser.status === "open") 
      return DispenserInUse.throwWithId(id)

    delete this.dispensers[id];
  }

  async updateStatus(
    id: UniqueId,
    status: DispenserStatus,
    updatedAt: string
  ): Promise<DispenserStatus | void> {
    const storedDispenser = this.findById(id);
    if (!storedDispenser) {
      return DispenserDoesNotExist.throwWithId(id);
    }
    if (status === storedDispenser.status)
      return DispenserAlreadyOpenClosed.throwWithIdAndStatus(id, status);

    if (status === "open") {
      this.dispensers[id].open(updatedAt);
    } else if (status === "closed") {
      this.dispensers[id].close(updatedAt);
    }
    return status;
  }

  async getSpending(id: string) {
    const storedDispenser = this.findById(id);
    if (!storedDispenser) {
      return DispenserDoesNotExist.throwWithId(id);
    }

    const amount = storedDispenser.usages.reduce((amount, usage) => {
      usage.calculateVolume(storedDispenser.flowVolume);
      usage.calculateCost(storedDispenser.costPerLitre);
      return amount + usage.spent;
    }, 0.0);

    const dispenserFromDomain = this.fromDomain(storedDispenser);

    return {
      amount,
      usages: dispenserFromDomain.usages,
    };
  }
}
