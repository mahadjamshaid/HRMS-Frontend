import { AUTH_TOKEN_KEY, ROLE_KEY } from "../constants/auth.constants";
import type { AuthenticatedUser } from "../types/auth";

export const getToken = (): string | null => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

export const setToken = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(ROLE_KEY)
    window.location.replace("/login")
}

export const isAuthenticated = (): boolean => {
    return !!getToken() && !!localStorage.getItem(ROLE_KEY);
}

export const getUser = (): AuthenticatedUser | null => {
    const token = getToken();
    if (!token) return null;
    try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload)) as AuthenticatedUser;
        return decoded;
    } catch (e) {
        return null;
    }
}
