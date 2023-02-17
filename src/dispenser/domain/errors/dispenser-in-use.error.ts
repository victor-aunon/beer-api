export class DispenserInUse extends Error {
  constructor(errorMessage) {
    super(errorMessage);
  }

  static throwWithId(id: UniqueId) {
    throw new DispenserInUse(
      `Dispenser with ID ${id} is in use and cannot be removed`
    );
  }
}
