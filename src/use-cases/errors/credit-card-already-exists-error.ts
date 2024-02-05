export class CreditCardAlreadyExistsError extends Error {
  constructor() {
    super('Cartão de crédito já existe')
  }
}