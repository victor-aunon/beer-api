export class InvalidStatus extends Error {
  constructor(errorMessage) {
    super(errorMessage);
  }

  static throw() {
    throw new InvalidStatus(`status must be open or closed`);
  }
}
