export class InvalidChargeIdError extends Error {
  constructor() {
    super('ID de cobrança inválido.')
  }
}