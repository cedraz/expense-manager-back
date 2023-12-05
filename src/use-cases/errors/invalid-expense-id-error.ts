export class InvalidExpenseIdError extends Error {
  constructor() {
    super('Invalid expense id.')
  }
}