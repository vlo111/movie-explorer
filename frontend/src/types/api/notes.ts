export interface INote {
    id: number;
    movie_id?: number;
    content: string;
    rating?: number;
    movie_title?: string;
    movie_poster?: string;
    created_at: string;
    updated_at: string;
}

export interface INoteCreate {
    movie_id?: number;
    content: string;
    rating?: number;
    movie_title?: string;
    movie_poster?: string;
}

export interface INoteUpdate {
    content?: string;
    rating?: number;
}

export interface INotesResponse {
    notes: INote[];
    total: number;
}
