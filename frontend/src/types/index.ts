import {ISortOption} from "./api";

export interface IRouteParams {
    id?: string;
}

export type SearchOptionsType = Array<ISortOption>

export interface IPaginatedResponse<IMovie> {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}
