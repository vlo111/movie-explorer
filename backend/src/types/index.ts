export * from './api';
export * from './movie';
export * from './controllers';

export interface IAppError extends Error {
    status?: number;
    statusCode?: number;
}

export interface IBody {
    message: string;
}

export interface IPaginatedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}
