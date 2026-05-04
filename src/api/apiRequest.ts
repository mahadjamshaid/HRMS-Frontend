import type { ApiResponse, BackendResponse } from "../types/api";
import { getToken } from "../utils/auth.utils";

const API = import.meta.env.VITE_API_BASE_URL;

const isBackendResponse = <T>(data: unknown): data is BackendResponse<T> => {
    if (!data || typeof data !== "object") return false;

    return "success" in data || "data" in data || "message" in data || "error" in data;
};

export const apiRequest = async<T>(
    endpoint:string,
    options:RequestInit = {}
):Promise<ApiResponse<T>> =>{
    const token = getToken()
    try{
        const res = await fetch (`${API}${endpoint}`,{
        headers:{"content-type":"application/json",
            ...(token && {Authorization: `Bearer ${token}`}),
            ...options.headers
        },
        ...options
        });
        const responseBody = await res.json();

        if (isBackendResponse<T>(responseBody)) {
            return {
                ok: res.ok,
                status: res.status,
                success: responseBody.success,
                data: responseBody.data ?? null,
                message: responseBody.message,
                error: responseBody.error,
            };
        }

        return{
            ok:res.ok,
            status:res.status,
            data: responseBody as T,
        }
    }
    catch(error){
        return{
            ok:false,
            status:500,
            success: false,
            data: null,
            error:"Network Error",
        }
    }
};
