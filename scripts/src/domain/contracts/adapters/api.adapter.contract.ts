import { ApiOptions } from '../../../infrastructure/interfaces';

export abstract class ApiAdapterContract {
    public abstract get<T>(url: string, options?: ApiOptions): Promise<T>; 
}