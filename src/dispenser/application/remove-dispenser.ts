import { InMemoryDispenserRepository } from "@app/dispenser/infrastructure/repositories";

export class RemoveDispenser {
  constructor(
    private readonly dispenserRepository: InMemoryDispenserRepository
  ) {}

  async remove(id: UniqueId): Promise<void> {
    await this.dispenserRepository.remove(id);
  }
}
