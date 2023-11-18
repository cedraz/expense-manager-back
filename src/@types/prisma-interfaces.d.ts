export interface creditCardsInterface {
    id: string
    card_name: string;
    Expenses: expensesInterface[];
}

export interface expensesInterface {
    id: string;
    description: string;
    amount: number;
    date: Date;
    credit_card_id: string;
}
