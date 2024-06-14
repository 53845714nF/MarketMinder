import { useQuery } from 'react-query';
import {UserList} from "../../models/user.ts";

export default function useUsers(name: string, enabled: boolean) {
    const URL = import.meta.env.VITE_API_URL

    return useQuery(['users', name], async (): Promise<UserList> => {
        const response = await fetch(`${URL}/users/${name}`, {
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
    },{
        enabled
    });
}