export type AuthRole = "admin" | "employee";

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    message: string;
    token: string;
    role: AuthRole;
    error?: string;
};

export type SignupRequest = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type SignupResponse = {
    message: string;
    token: string;
    role?: AuthRole;
    error?: string;
};

export type AuthMessageResponse = {
    message?: string;
    error?: string;
};

export type AuthenticatedUser = {
    id?: number;
    username?: string;
    email?: string;
    role?: AuthRole;
};

