import {useMutation} from "react-query";
import {Signup} from "../../models/auth.ts";


export default function useSignup() {
    const URL = import.meta.env.VITE_API_URL

    return useMutation(async (userData: Signup) => {
        const response = await fetch(`${URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.reason);
        }

        const data = await response.text();
        return data ? JSON.parse(data) : null;
    });
}