import { IDiscoverMovieFilters } from '../movie';
import {
    GetMoviesResponse,
    GetPopularResponse,
    GetMovieResponse,
    DiscoverMoviesResponse,
    GetGenresResponse
} from '../api';

export interface IMovieService {
    getMovies(query: string, page?: number): Promise<GetMoviesResponse>;
    getPopular(page?: number): Promise<GetPopularResponse>;
    getMovie(id: number): Promise<GetMovieResponse>;
    discoverMovies(filters: IDiscoverMovieFilters, page?: number): Promise<DiscoverMoviesResponse>;
    getGenres(): Promise<GetGenresResponse>;
}
