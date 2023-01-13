import { HttpResponse } from "../api";

export type Loadable<T> = { response: T, isLoading?: false, error?: undefined }
    | { isLoading: true, response?: undefined, error?: undefined }
    | { isLoading?: false, response?: undefined, error: object }
    | { response?: undefined, isLoading?: false, error?: undefined };

export const createLoaded = async <T>(apiCall: HttpResponse<T, any>): Promise<{ response: T }> => ({
    response: await apiCall.json(),
});

export const createError = <T>(error: unknown): { error: object } => ({
    error: error as object
});
