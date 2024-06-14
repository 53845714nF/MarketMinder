import {useMutation} from "react-query";
import { CreateList } from "../../models/list.ts";

export default function useAddList() {
    const URL = import.meta.env.VITE_API_URL;

    return useMutation(async (listName: CreateList) => {
        const response = await fetch(`${URL}/shopping_lists`, {
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