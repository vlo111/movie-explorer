export type PaginatedResponse = {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
};

export interface IMovie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    vote_average: number;
}

export interface IDiscoverFilters {
    with_genres?: string;
    year?: string;
    vote_average_gte?: string;
    sort_by?: string;
}

export type MovieMode = 'search' | 'discover' | 'popular';

export interface UseMovieStateProps {
    searchTerm: string;
    filters: IDiscoverFilters;
    searchData?: PaginatedResponse;
    discoverData?: PaginatedResponse;
    popularData?: PaginatedResponse;
    isLoadingSearch: boolean;
    isLoadingDiscover: boolean;
    isErrorSearch: boolean;
    isErrorDiscover: boolean;
}

export interface UseMovieStateReturn {
    movies: any[];
    totalPages: number;
    isLoading: boolean;
    isError: boolean;
    isEmpty: boolean;
}
