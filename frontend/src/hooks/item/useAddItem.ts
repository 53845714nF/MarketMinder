import {useMutation} from "react-query";
import { CreateItem } from "../../models/item.ts";

export default function useAddItem() {
    const URL = import.meta.env.VITE_API_URL;

    return useMutation(async (listName: CreateItem) => {
        const response = await fetch(`${URL}/items`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(listName),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.reason);
        }

        const data = await response.text()
        return data ? data : null;
    });
}