import {PaginatedResponse} from "../types/api.ts";

export function useActiveMovieData(
    isSearching: boolean,
    searchData?: PaginatedResponse,
    popularData?: PaginatedResponse
) {
    const data = isSearching ? searchData : popularData;

    return {
        movies: data?.results ?? [],
        totalPages: data?.total_pages ?? 1,
    };
}
