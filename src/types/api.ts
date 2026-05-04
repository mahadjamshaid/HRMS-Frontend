export type ApiResponse<T> = {
    ok: boolean;
    status: number;
    data: T | null;
    success?: boolean;
    message?: string;
    error?: string;
};

export type BackendResponse<T> = {
    success?: boolean;
    data?: T;
    message?: string;
    error?: string;
};
