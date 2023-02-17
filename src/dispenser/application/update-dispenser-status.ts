import { InMemoryDispenserRepository } from "@app/dispenser/infrastructure/repositories";
import {
  ParameterNotProvidedInRequest,
  InvalidStatus,
  InvalidDateTime,
} from "@app/dispenser/domain/errors";

export class UpdateDispenserStatus {
  constructor(
    private readonly dispenserRepository: InMemoryDispenserRepository
  ) {}

  async update(
    id: UniqueId,
    status: DispenserStatus,
    updatedAt: DateTimeString
  ): Promise<DispenserStatus | void> {
    if (!status) return ParameterNotProvidedInRequest.throwWithParam("status");
    if (!updatedAt)
      return ParameterNotProvidedInRequest.throwWithParam("updated_at");
    if (["open", "closed"].includes(status) === false)
      return InvalidStatus.throw();
    if (new Date(updatedAt).toString() === "Invalid Date")
      return InvalidDateTime.throw();

    return await this.dispenserRepository.updateStatus(id, status, updatedAt);
  }
}
