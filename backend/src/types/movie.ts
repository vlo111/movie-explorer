import { ParsedQs } from "qs";

export interface IGenre {
    id: number;
    name: string;
}

export interface IMovie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    backdrop_path?: string | null;
    vote_average: number;
    vote_count?: number;
    popularity?: number;
    adult?: boolean;
    original_language?: string;
    original_title?: string;
    genre_ids?: number[];
    video?: boolean;
}

export interface IMovieDetails extends IMovie {
    genres?: IGenre[];
    status: string;
}
export interface IDiscoverMovieFilters {
    with_genres?: string | ParsedQs | (string | ParsedQs)[];
    year?: string | ParsedQs | (string | ParsedQs)[];
    'vote_average.gte'?: number;
    'vote_average.lte'?: number;
    'with_runtime.gte'?: number;
    'with_runtime.lte'?: number;
    sort_by?: string | ParsedQs | (string | ParsedQs)[];
    'primary_release_date.gte'?: string | ParsedQs | (string | ParsedQs)[];
    'primary_release_date.lte'?: string | ParsedQs | (string | ParsedQs)[];
    with_companies?: string | ParsedQs | (string | ParsedQs)[];
    with_keywords?: string | ParsedQs | (string | ParsedQs)[];
    language?: string | ParsedQs | (string | ParsedQs)[];
    region?: string | ParsedQs | (string | ParsedQs)[];
}
