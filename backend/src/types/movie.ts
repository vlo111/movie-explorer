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
    vote_average: number;
    tagline?: string;
    runtime?: number;
    genres?: IGenre[];
}

export interface IMovieDetails extends IMovie {
    genres?: IGenre[];
    status: string;
}
export interface IDiscoverMovieFilters {
    with_genres?: string | ParsedQs | (string | ParsedQs)[];
    year?: string | ParsedQs | (string | ParsedQs)[];
    sort_by?: string | ParsedQs | (string | ParsedQs)[];
}
