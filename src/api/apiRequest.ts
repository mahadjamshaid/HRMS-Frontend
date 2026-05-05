import type { ApiResponse, BackendResponse } from "../types/api";
import { getToken } from "../utils/auth.utils";

const getApiBaseUrl = (): string | null => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    if (typeof apiBaseUrl !== "string" || !apiBaseUrl.trim()) {
        return null;
    }

    return apiBaseUrl.trim().replace(/\/+$/, "");
};

const isBackendResponse = <T>(data: unknown): data is BackendResponse<T> => {
    if (!data || typeof data !== "object") return false;

    return "success" in data || "data" in data || "message" in data || "error" in data;
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
    const responseText = await response.text();

    if (!responseText) return null;

    try {
        return JSON.parse(responseText);
    } catch {
        return { message: responseText };
    }
};

export const apiRequest = async<T>(
    endpoint:string,
    options:RequestInit = {}
):Promise<ApiResponse<T>> =>{
    const apiBaseUrl = getApiBaseUrl();

    if (!apiBaseUrl) {
        return {
            ok: false,
            status: 500,
            success: false,
            data: null,
            error: "Missing VITE_API_BASE_URL. Add it to your deployment environment variables and redeploy.",
        };
    }

    const token = getToken()
    try{
        const res = await fetch (`${apiBaseUrl}${endpoint}`,{
        headers:{"content-type":"application/json",
            ...(token && {Authorization: `Bearer ${token}`}),
            ...options.headers
        },
        ...options
        });
        const responseBody = await parseResponseBody(res);

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
