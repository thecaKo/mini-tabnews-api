export class UserAlredyExistError extends Error {
  constructor() {
    super("User Alredy Exists");
  }
}
