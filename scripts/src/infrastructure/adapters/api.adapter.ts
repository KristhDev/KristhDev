import { apiMessages } from '../../application/constants/api.constants';

import { ApiError } from '../../domain/errors/api.error';

export class ApiAdapter {
    /**
     * Makes a GET request to the given URL.
     *
     * @param {string} url The URL to make the request to.
     * @param {RequestInit} [init] The options to pass to the fetch function.
     * @returns {Promise<T>} The response data as JSON.
     * @throws {ApiError} If the response status is not 200, or if there is an error with the request.
     */
    public static async get<T>(url: string, init: RequestInit = {}): Promise<T> {
        init.headers = {
            ...init.headers,
            Accept: 'application/json'
        }

        init.method = 'GET';

        try {
            const resp = await fetch(url, init);
            const data = await resp.json();

            if (!resp.ok) {
                const error = new ApiError(
                    data?.message || apiMessages.UNEXPECTED_ERROR,
                    data?.status || resp.status,
                    resp.statusText
                );

                throw error;
            }

            return data as T;
        }
        catch (error) {
            throw error;
        }
    }
}