export class InvalidDateTime extends Error {
  constructor(errorMessage) {
    super(errorMessage);
  }

  static throw() {
    throw new InvalidDateTime(`updated_at is not a valid ISO string date`);
  }
}
