import {IUseMovieStateProps, IUseMovieStateReturn} from "../types/hooks";
import {IPaginatedResponse} from "../types";
import {IMovie, MovieMode} from "../types/api";

export function useMovieState(props: IUseMovieStateProps): IUseMovieStateReturn {
    const {
        searchTerm, searchData,
        isLoadingSearch, isLoadingDiscover,
        isErrorSearch, isErrorDiscover,
        discoverData, popularData, filters
    } = props;

    const hasSearch = searchTerm.trim().length > 0;
    const hasFilters = Object.keys(filters).length > 0;

    const mode: MovieMode = hasSearch ? 'search' : hasFilters
        ? 'discover'
        : 'popular';

    let data: IPaginatedResponse<IMovie> | undefined;
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
