import { Api } from "./api";

declare global {
    interface Window {
        baseUrl?: string;
        userId?: number;
    }
}

export const configuredApi = new Api({
    baseUrl: window.baseUrl || "http://localhost:3000/api",
});

export const userId = window.userId || 1;
