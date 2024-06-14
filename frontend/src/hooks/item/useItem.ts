import { useQuery } from 'react-query';
import {Item} from "../../models/item.ts";

export default function useItem(id: string) {
    const URL = import.meta.env.VITE_API_URL

    return useQuery(['list', id], async (): Promise<Item> => {
        const response = await fetch(`${URL}/items/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch lists');
        }
        return response.json();
    });
}