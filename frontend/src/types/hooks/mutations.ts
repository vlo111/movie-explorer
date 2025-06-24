import {INote, INoteCreate, INoteUpdate} from "../api";

export interface ICreateNoteMutation {
    mutate: (data: INoteCreate, options?: {
        onSuccess?: (data: INote) => void;
        onError?: (error: Error) => void;
    }) => void;
    isPending: boolean;
    isError: boolean;
    error: Error | null;
}

export interface IUpdateNoteMutation {
    mutate: (params: { id: number; data: INoteUpdate }, options?: {
        onSuccess?: (data: INote) => void;
        onError?: (error: Error) => void;
    }) => void;
    isPending: boolean;
    isError: boolean;
    error: Error | null;
}

export interface IDeleteNoteMutation {
    mutate: (id: number, options?: {
        onSuccess?: () => void;
        onError?: (error: Error) => void;
    }) => void;
    isPending: boolean;
    isError: boolean;
    error: Error | null;
}
