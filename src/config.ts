import { Api } from "./api";

declare global {
    interface Window {
        baseUrl?: string;
    }
}

export const configuredApi = new Api({
    baseUrl: window.baseUrl || "http://localhost:3000",
});
