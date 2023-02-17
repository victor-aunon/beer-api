export class DispenserAlreadyOpenClosed extends Error {
  constructor(errorMessage) {
    super(errorMessage);
  }

  static throwWithIdAndStatus(id: UniqueId, status: DispenserStatus) {
    throw new DispenserAlreadyOpenClosed(
      `Dispenser with ID ${id} is already ${status}`
    );
  }
}
