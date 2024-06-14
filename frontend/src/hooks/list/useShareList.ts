import { useMutation } from 'react-query';
import { User } from "../../models/auth.ts";
import { ShareListResponse } from "../../models/list.ts";

export default function useShareList() {
    const URL = import.meta.env.VITE_API_URL;

    return useMutation<ShareListResponse, Error, { id: string; user: User }>(
        async (variables) => {
            const {id, user} = variables;
            const response = await fetch(`${URL}/shopping_lists/${id}/share`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
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