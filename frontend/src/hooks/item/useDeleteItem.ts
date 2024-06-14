import {useMutation} from "react-query";

export default function useDeleteItem() {
    const URL = import.meta.env.VITE_API_URL

    return useMutation(['deleteItem'], async (id: string) => {
        const response = await fetch(`${URL}/items/${id}`, {
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