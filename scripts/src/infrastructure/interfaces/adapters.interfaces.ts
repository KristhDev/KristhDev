export type AcceptHeader = 'application/json' | 'application/xml' | 'text/html' | 'text/plain' | 'text/csv' | string;
export type ContentTypeHeader = 'application/json' | 'application/xml' | 'multipart/form-data' | 'text/html' | 'text/plain' | 'text/csv' | string;

export type HttpHeaders = {
    Accept?: AcceptHeader;
    'Accept-Language'?: string;
    Authorization?: string;
    'Content-Type'?: ContentTypeHeader;
} | Record<string, string> | Headers;

export type HttpBody = Blob | BufferSource | FormData | URLSearchParams | string;

export interface ApiOptions {
    body?: HttpBody;
    headers?: HttpHeaders;
    queryParams?: Record<string, string>;
    signal?: AbortSignal;
}