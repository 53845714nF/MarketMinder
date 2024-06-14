import { useMutation } from 'react-query';
import { Item, UpdateItem } from "../../models/item.ts";


export default function useChageItem() {
    const URL = import.meta.env.VITE_API_URL;

    return useMutation<Item, Error, { id: string; item: UpdateItem }>(
        async (variables) => {
            const {id, item} = variables;
            const response = await fetch(`${URL}/items/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            if (!response.ok) {
                return response.json().then((errorData) => Promise.reject(new Error(errorData.message)));
            }
            const data = await response.text();
            return data ? JSON.parse(data) : null;
        },
        {
            mutationKey: 'changeItem',
        }
    );
}