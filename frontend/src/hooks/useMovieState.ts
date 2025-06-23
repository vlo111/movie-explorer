import {MovieMode, PaginatedResponse, UseMovieStateProps, UseMovieStateReturn} from "../types/api";

export function useMovieState({
                                  searchTerm, filters, searchData, discoverData, popularData,
                                  isLoadingSearch, isLoadingDiscover, isErrorSearch, isErrorDiscover
                              }: UseMovieStateProps): UseMovieStateReturn {

    const hasSearch = searchTerm.trim().length > 0;
    const hasFilters = Object.keys(filters).length > 0;

    const mode: MovieMode = hasSearch ? 'search' : hasFilters
        ? 'discover'
        : 'popular';

    let data: PaginatedResponse | undefined;
    let isLoading = false;
    let isError = false;

    switch (mode) {
        case 'search':
            data = searchData;
            isLoading = isLoadingSearch;
            isError = isErrorSearch;
            break;
        case 'discover':
            data = discoverData;
            isLoading = isLoadingDiscover;
            isError = isErrorDiscover;
            break;
        case 'popular':
            data = popularData;
            break;
    }

    const movies = data?.results ?? [];
    const totalPages = data?.total_pages ?? 1;
    const isEmpty = !isLoading && movies.length === 0 && mode !== 'popular';

    return { movies, totalPages, isLoading, isError, isEmpty };
}
