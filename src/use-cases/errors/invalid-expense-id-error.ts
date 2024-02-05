export class InvalidExpenseIdError extends Error {
  constructor() {
    super('ID de despesa inválido.')
  }
}