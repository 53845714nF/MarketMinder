import { useQuery } from 'react-query';
import { User } from "../../models/user.ts"

const fetchProfile = async (): Promise<User> => {
    const URL = import.meta.env.VITE_API_URL
    const response = await fetch(`${URL}/profile`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
       throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useProfile = () => {
    return useQuery('profile', fetchProfile, {
        retry: false, // nicht wiederholen, wenn die Anfrage fehlschlägt
        staleTime: Infinity, // Keine automatische Aktualisierung
    });
};