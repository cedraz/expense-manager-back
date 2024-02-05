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

export interface UpdateChargeData {
    chargeId: string;
    description?: string;
    amount?: number;
}

export interface UpdateExpenseData {
    expenseId: string;
    description?: string;
    amount?: number;
}

interface BatchPayload {
    count: number;
}