export interface creditCardsInterface {
    id: string
    card_name: string;
}

export interface expensesInterface {
    id: string;
    description: string;
    amount: Prisma.Decimal;
    date: Date;
    credit_card_id: string;
}