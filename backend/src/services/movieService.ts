import api from './api';
import {
    GetMoviesResponse,
    GetPopularResponse,
    GetMovieResponse,
    DiscoverMoviesResponse,
    GetGenresResponse, IDiscoverMovieFilters, IBody, IMovieListResponse, IMovieDetails, IGenreListResponse
} from '@/types';
import {NextFunction, Request, Response} from "express";
import {IMovieService} from "@/types/services";
import {MOVIE_URNS} from "@/helpers/contants";

export const MovieService: IMovieService = {

    async getMovies(q: string, p = 1): Promise<GetMoviesResponse> {
        const res = await api.get(MOVIE_URNS.SEARCH, {
            params: { query: q, page: p },
        });
        return res.data;
    },

    async getPopular(p = 1): Promise<GetPopularResponse> {
        const res = await api.get(MOVIE_URNS.POPULAR, {
            params: { page: p },
        });
        return res.data;
    },

    async getMovie(id: number): Promise<GetMovieResponse> {
        const res = await api.get(`/movie/${id}`);
        return res.data;
    },

    async discoverMovies(
        filters: IDiscoverMovieFilters,
        p = 1
    ): Promise<DiscoverMoviesResponse> {
        const res = await api.get(MOVIE_URNS.DISCOVER, {
            params: { ...filters, page: p },
        });
        return res.data;
    },

    async getGenres(): Promise<GetGenresResponse> {
        const res = await api.get(MOVIE_URNS.GENRE);
        return res.data;
    }
};
