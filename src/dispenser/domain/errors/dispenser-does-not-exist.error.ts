export class DispenserDoesNotExist extends Error {
  constructor(errorMessage) {
    super(errorMessage);
  }

  static throwWithId(id: UniqueId) {
    throw new DispenserDoesNotExist(`Dispenser with ID ${id} does not exist`);
  }
}
