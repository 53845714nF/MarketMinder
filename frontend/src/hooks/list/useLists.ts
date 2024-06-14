import { useQuery } from 'react-query';
import {ListResponse} from "../../models/list.ts";

export default function useLists() {
    const URL = import.meta.env.VITE_API_URL

    return useQuery('lists', async (): Promise<ListResponse> => {
        const response = await fetch(`${URL}/shopping_lists`, {
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