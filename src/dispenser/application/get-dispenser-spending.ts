import { InMemoryDispenserRepository } from "@app/dispenser/infrastructure/repositories";
import type { GetSpending } from "../domain/repository";

export class GetDispenserSpending {
  constructor(
    private readonly dispenserRepository: InMemoryDispenserRepository
  ) {}

  async getSpending(
    id: UniqueId,
  ): Promise<GetSpending | void> {
    return await this.dispenserRepository.getSpending(id);
  }
}
