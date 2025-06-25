import api from './api';
import {
    GetMoviesResponse,
    GetPopularResponse,
    GetMovieResponse,
    DiscoverMoviesResponse,
    GetGenresResponse,
    IDiscoverMovieFilters
} from '@/types';
import { IMovieService } from '@/types/services';
import { MOVIE_URNS } from '@/helpers/contants';
import { AxiosRequestConfig } from 'axios';

/**
 * Movie service for handling movies API operations
 */
export const MovieService: IMovieService = {
    /**
     * Search for movies by query string
     * @param query - Search query string
     * @param page - Page number (default: 1)
     * @returns Promise containing search results
     */
    async getMovies(query: string, page = 1): Promise<GetMoviesResponse> {
        try {
            const config: AxiosRequestConfig = {
                params: {
                    query,
                    page
                },
            };

            const response = await api.get(MOVIE_URNS.SEARCH, config);
            return response.data;
        } catch (error) {
            console.error('Error searching movies:', error);
            throw new Error(`Failed to search movies: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    },

    /**
     * Get popular movies
     * @param page - Page number (default: 1)
     * @returns Promise containing popular movies
     */
    async getPopular(page = 1): Promise<GetPopularResponse> {
        try {
            const config: AxiosRequestConfig = {
                params: { page },
            };

            const response = await api.get(MOVIE_URNS.POPULAR, config);
            return response.data;
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            throw new Error(`Failed to fetch popular movies: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    },

    /**
     * Get detailed information for a specific movie
     * @param id - Movie ID
     * @returns Promise containing movie details
     */
    async getMovie(id: number): Promise<GetMovieResponse> {
        try {
            if (!id || id <= 0) {
                throw new Error('Invalid movie ID provided');
            }

            const response = await api.get(`/movie/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching movie with ID ${id}:`, error);
            throw new Error(`Failed to fetch movie details: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    },

    /**
     * Discover movies based on filters
     * @param filters - Movie discovery filters
     * @param page - Page number (default: 1)
     * @returns Promise containing discovered movies
     */
    async discoverMovies(
        filters: IDiscoverMovieFilters,
        page = 1
    ): Promise<DiscoverMoviesResponse> {
        try {
            const config: AxiosRequestConfig = {
                params: {
                    ...filters,
                    page
                },
            };

            const response = await api.get(MOVIE_URNS.DISCOVER, config);
            return response.data;
        } catch (error) {
            console.error('Error discovering movies:', error);
            throw new Error(`Failed to discover movies: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    },

    /**
     * Get all available movie genres
     * @returns Promise containing genre list
     */
    async getGenres(): Promise<GetGenresResponse> {
        try {
            const response = await api.get(MOVIE_URNS.GENRE);
            return response.data;
        } catch (error) {
            console.error('Error fetching genres:', error);
            throw new Error(`Failed to fetch genres: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
};
