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

export interface chargesInterface {
    id: string;
    description: string;
    amount: number;
    date: Date;
    user_id: string;
}

