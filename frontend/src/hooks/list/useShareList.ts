import { useMutation } from 'react-query';
import { ShareListResponse } from "../../models/list.ts";

export default function useShareList() {
    const URL = import.meta.env.VITE_API_URL;

    return useMutation<ShareListResponse, Error, { listId: string; userId:string  }>(
        async (variables) => {
            const {listId, userId} = variables;
            const response = await fetch(`${URL}/shopping_lists/${listId}/share`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"user_id": userId}),
            });
            if (!response.ok) {
                return response.json().then((errorData) => Promise.reject(new Error(errorData.message)));
            }
            const data = await response.text();
            return data ? JSON.parse(data) : null;
        },
        {
            mutationKey: 'shareList',
        }
    );
}