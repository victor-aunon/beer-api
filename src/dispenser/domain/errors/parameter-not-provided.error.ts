export class ParameterNotProvidedInRequest extends Error {
  constructor(errorMessage) {
    super(errorMessage);
  }

  static throwWithParam(param: string) {
    throw new ParameterNotProvidedInRequest(
      `${param} must be provided in the body request`
    );
  }
}
