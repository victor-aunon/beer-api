import { Dispenser } from "@app/dispenser/domain";
import { costLitre } from "@app/dispenser/domain";
import { InMemoryDispenserRepository } from "@app/dispenser/infrastructure/repositories";
import {
  DispenserAlreadyOpenClosed,
  ParameterNotProvidedInRequest,
} from "@app/dispenser/domain/errors";

export class CreateDispenser {
  constructor(
    private readonly dispenserRepository: InMemoryDispenserRepository
  ) {}

  async create(
    flowLitresPerSecond: number,
    costPerLitre = costLitre
  ): Promise<Dispenser | void> {
    if (!flowLitresPerSecond)
      return ParameterNotProvidedInRequest.throwWithParam("flow_volume");

    const newDispenser = Dispenser.create(flowLitresPerSecond, costPerLitre);
    // Save the dispenser
    await this.dispenserRepository.create(newDispenser);
    return newDispenser;
  }
}
