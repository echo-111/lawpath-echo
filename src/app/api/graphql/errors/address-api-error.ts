export class AddressApiError extends Error {
  public response: unknown;
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}