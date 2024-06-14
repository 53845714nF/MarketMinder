import { useMutation } from 'react-query';

export default function useLogout() {
    const URL = import.meta.env.VITE_API_URL

    return useMutation('logout', async () => {
        const response = await fetch(`${URL}/logout`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to logout');
        }
        return response.json();
    });
}