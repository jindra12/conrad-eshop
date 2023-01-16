import { Api } from "./api";

declare global {
    interface Window {
        baseUrl?: string;
        userId?: number;
    }
}

/**
 * Configured fake store API. Leads to localhost:3000/api by default
 */
export const configuredApi = new Api({
    baseUrl: window.baseUrl || "http://localhost:3000/api",
});

/**
 * User ID from window config. 1 by default
 */
export const userId = window.userId || 1;
