import { HttpResponse } from "../api";

/**
 * Type describing API response state (loading/error/data)
 */
export type Loadable<T> = { response: T, isLoading?: false, error?: undefined }
    | { isLoading: true, response?: undefined, error?: undefined }
    | { isLoading?: false, response?: undefined, error: object }
    | { response?: undefined, isLoading?: false, error?: undefined };

/**
 * Creates a Loadable type with finished API request
 */
export const createLoaded = async <T>(apiCall: HttpResponse<T, any>): Promise<{ response: T }> => ({
    response: await apiCall.json(),
});

/**
 * Creates a Loadable type with API error response
 */
export const createError = <T>(error: unknown): { error: object } => ({
    error: error as object
});
