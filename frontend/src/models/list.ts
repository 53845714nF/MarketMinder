import {ItemId} from "./item.ts";

export interface CreateList {
    name: string;
}

export interface ListResponse {
    message?: string;
    shopping_list: ShoppingList[];
}

export interface ShoppingList {
    id: string;
    name: string;
}

export interface ItemsFromList {
    name: string;
    items: ItemId[]
}

export interface ShareListResponse {
    message: string;
}