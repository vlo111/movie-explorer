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

export interface IGenre {
    id: number;
    name: string;
}

export interface IDiscoverFilters {
    with_genres?: string;
    year?: string;
    vote_average_gte?: string;
    sort_by?: string;
    [key: string]: string | undefined;
}

export interface ISortOption {
    value: string;
    label: string;
}

export type MovieMode = 'search' | 'discover' | 'popular';
