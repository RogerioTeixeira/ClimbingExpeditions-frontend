export abstract class ServerErrorHandler<T extends Error> {
  constructor(protected error: T) {}

  abstract get decodeMessage(): string;
  abstract get code(): any;

  get message() {
    return this.error.message;
  }
}
