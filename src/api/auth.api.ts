import { apiRequest } from "./apiRequest";
import type {
    AuthMessageResponse,
    LoginRequest,
    LoginResponse,
    SignupRequest,
    SignupResponse,
} from "../types/auth";

export const loginUser = async (data: LoginRequest) => {
    return apiRequest<LoginResponse>("/auth/login",{
        method: "POST",
        body: JSON.stringify(data),
    });
}

export const signupUser = async (data: SignupRequest) => {
    return apiRequest<SignupResponse>("/auth/signup",{
        method: "POST",
        body: JSON.stringify(data),
    });
}

export const forgotPassword = async (email: string) => {
  return apiRequest<AuthMessageResponse>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}) => {
  return apiRequest<AuthMessageResponse>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
};


