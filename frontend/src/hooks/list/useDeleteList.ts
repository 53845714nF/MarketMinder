import {useMutation} from "react-query";

export default function useDeleteList() {
    const URL = import.meta.env.VITE_API_URL

    return useMutation(['deleteList'], async (id: string) => {
        const response = await fetch(`${URL}/shopping_lists/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.reason);
        }

        const data = await response.text();

        return data ? data : null;
    });
}