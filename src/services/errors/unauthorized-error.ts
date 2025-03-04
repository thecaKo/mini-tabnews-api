export class Unauthorized extends Error {
  statusCode: number;

  constructor(message: string = "Unauthorized!") {
    super(message);
    this.statusCode = 401;
    this.name = "UnauthorizedError";
  }
}
