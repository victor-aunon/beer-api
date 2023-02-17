export class DispenserAlreadyExists extends Error {
  constructor(errorMessage) {
    super(errorMessage);
  }

  static throw() {
    throw new DispenserAlreadyExists(`Dispenser already exists`);
  }
}
