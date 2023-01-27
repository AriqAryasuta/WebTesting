import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAuthContext } from "./useAuthContext";

export const useLogin = ({ setError, setLoading }) => {
    const { dispatch } = useAuthContext();
    const [isPending, setIsPending] = useState(null);
    const url = '/api/users/login';

    const login = async (name, password) => {
        setIsPending(true);

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name, password })
        });

        const user = await response.json();

        if (user.success) {
            localStorage.setItem('user', JSON.stringify(user.data));
            dispatch({ type: 'LOGIN', payload: user.data });
            setLoading(false);
            return {
                isError: false,
                message: 'Login Success!'
            }
        }
        if (!user.success) {
            setLoading(false);
            return {
                isError: true,
                message: user.error
            }
        }
    }

    return {login, isPending};
}

