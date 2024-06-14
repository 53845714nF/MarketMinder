import { useQuery } from 'react-query';
import {ItemsFromList} from "../../models/list.ts";

export default function useLists(id: string) {
    const URL = import.meta.env.VITE_API_URL

    return useQuery(['list', id], async (): Promise<ItemsFromList> => {
        const response = await fetch(`${URL}/shopping_lists/${id}/items`, {
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