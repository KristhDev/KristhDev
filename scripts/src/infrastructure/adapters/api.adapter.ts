/* Constants */
import { apiMessages } from '@application/constants';

/* Contracts */
import { ApiAdapterContract } from '@domain/contracts/adapters';

/* Errors */
import { ApiError } from '@domain/errors';

/* Interfaces */
import { ApiOptions } from '../interfaces';

export class ApiAdapter implements ApiAdapterContract {

    /**
     * Converts ApiOptions into a RequestInit object for use with fetch API.
     *
     * @param {ApiOptions} options Options for configuring the request, including body, headers, and signal.
     * @return {RequestInit} The initialized request object for fetch API.
     */
    private optionsToRequestInit(options: ApiOptions): RequestInit {
        return {
            body: options.body,
            headers: options.headers,
            signal: options.signal
        }
    }

    /**
     * Makes a request to the given URL with the given options.
     *
     * @param {string} url The URL to make the request to.
     * @param {RequestInit} init The options for the request.
     * @return {Promise<T>} The response data as JSON.
     * @throws {ApiError} If the response status is not 200, or if there is an error with the request.
     */
    private async makeRequest<T>(url: string, init: RequestInit): Promise<T> {
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

    /**
     * Makes a GET request to the given URL.
     *
     * @param {string} url The URL to make the request to.
     * @param {ApiOptions} options The options for the request.
     * @returns {Promise<T>} The response data as JSON.
     * @throws {ApiError} If the response status is not 200, or if there is an error with the request.
     */
    public async get<T>(url: string, options?: ApiOptions): Promise<T> {
        const requestInit = this.optionsToRequestInit({ ...options });
        requestInit.method = 'GET';

        try {
            const data = await this.makeRequest<T>(url, requestInit);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
}