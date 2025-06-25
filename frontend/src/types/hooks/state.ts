import {IDiscoverFilters, IMovie} from "../api";
import {IPaginatedResponse} from "../";

export interface IUseMovieStateProps {
    searchTerm: string;
    filters: IDiscoverFilters;
    searchData?: IPaginatedResponse<IMovie>;
    discoverData?: IPaginatedResponse<IMovie>;
    popularData?: IPaginatedResponse<IMovie>;
    isLoadingSearch: boolean;
    isLoadingDiscover: boolean;
    isErrorSearch: boolean;
    isErrorDiscover: boolean;
}

export interface IUseMovieStateReturn {
    movies: IMovie[];
    totalPages: number;
    isLoading: boolean;
    isError: boolean;
    isEmpty: boolean;
}

export interface IHomeState {
    page: number;
    searchTerm: string;
    currentSearch: string;
    filters: IDiscoverFilters;
}
