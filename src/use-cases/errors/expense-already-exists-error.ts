export class ExpenseAlreadyExistsError extends Error {
  constructor() {
    super('Expense already exists.')
  }
}