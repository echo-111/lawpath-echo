export class AddressApiError extends Error {
  public response: any;
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}