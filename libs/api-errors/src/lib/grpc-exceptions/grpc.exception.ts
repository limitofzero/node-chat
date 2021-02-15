export class GrpcException {
  public readonly code: number | string;
  public readonly message: string;

  constructor(code: number | string, message: string | Record<string, unknown>) {
    this.code = code;

    if (typeof message === 'string') {
      this.message = message;
    } else {
      this.message = JSON.stringify(message);
    }
  }
}
