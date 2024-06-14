export interface CreateItem {
    shopping_list_id: string;
    name: string;
    amount: number;
    done: boolean;
}

export interface UpdateItem {
    shopping_list_id: string;
    id: string;
    name: string;
    amount: number;
    done: boolean;
}

export interface Item {
    id: string;
    name: string;
    amount: number;
    done: boolean;
}

export interface ItemId {
    id: string;
}