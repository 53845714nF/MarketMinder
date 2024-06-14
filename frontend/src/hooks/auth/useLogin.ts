import {useMutation} from "react-query";
import {LoginResponse, Login} from "../../models/auth.ts";
import {useNavigate} from "react-router-dom";

export default function useLogin() {
    const navigate = useNavigate();

    const URL = import.meta.env.VITE_API_URL

    return useMutation('Login', async (userData: Login) => {
        const response = await fetch(`${URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.reason);
        }

        const data: LoginResponse = await response.json();
        navigate("/lists");
        return data;
    });
}