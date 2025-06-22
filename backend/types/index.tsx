import {ParsedQs} from "qs";

export interface IDiscoverMovieFilters {
    with_genres?:  string | ParsedQs | (string | ParsedQs)[];
    year?: string | ParsedQs | (string | ParsedQs)[];
    'vote_average.gte'?: number;
    'vote_average.lte'?: number;
    'with_runtime.gte'?: number;
    'with_runtime.lte'?: number;
    sort_by?: string | ParsedQs | (string | ParsedQs)[];
}
