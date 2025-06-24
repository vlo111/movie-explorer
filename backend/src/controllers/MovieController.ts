import { Request, Response, NextFunction } from 'express';
import {IDiscoverMovieFilters, IMovieDetails} from "@/types/movie";
import {IBody, IGenreListResponse, IMovieListResponse} from "@/types";
import {MovieService} from "@/services/movieService";

export const MovieController = {
    async search(req: Request, res: Response<IBody | IMovieListResponse>, next: NextFunction) {
        const { q, page } = req.query;

        if (!q) return res.status(400).json({ message: 'Missing search query' });

        try {
            const data = await MovieService.getMovies(String(q), +page || 1);
            res.json(data);
        } catch (err) {
            console.log('search error:', err);
            next(err);
        }
    },

    async popular(req: Request, res: Response<IMovieListResponse>, next: NextFunction) {
        try {
            const page = +req.query.page || 1;
            const data = await MovieService.getPopular(page);
            res.json(data);
        } catch (err) {
            next(err);
        }
    },

    async details(req: Request, res: Response<IMovieDetails | IBody>, next: NextFunction) {
        const id = +req.params.id;

        if (!id)  return res.status(400).json({ message: 'Invalid movie ID' })

        try {
            const movie = await MovieService.getMovie(id);
            res.json(movie);
        } catch (err) {
            if (err.status === 404) {
                res.status(404).json({ message: 'Not found' });
            } else {
                next(err);
            }
        }
    },

    async discover(req: Request, res: Response<IMovieListResponse | IBody>, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const filters: IDiscoverMovieFilters = {};

            const {
                with_genres,
                year,
                vote_average_gte,
                vote_average_lte,
                with_runtime_gte,
                with_runtime_lte,
                sort_by,
            } = req.query;

            if (with_genres) filters.with_genres = with_genres;
            if (year) filters.year = year;

            if (vote_average_gte) filters['vote_average.gte'] = +vote_average_gte;
            if (vote_average_lte) filters['vote_average.lte'] = +vote_average_lte;

            if (with_runtime_gte) filters['with_runtime.gte'] = +with_runtime_gte;
            if (with_runtime_lte) filters['with_runtime.lte'] = +with_runtime_lte;

            if (sort_by) filters.sort_by = sort_by;

            const data = await MovieService.discoverMovies(filters, page);
            res.json(data);
        } catch (err) {
            next(err);
        }
    },


    async genres(req: Request, res: Response<IBody | IGenreListResponse>, next: NextFunction) {
        console.log('get genre')
        try {
            const data = await MovieService.getGenres();
            res.json(data);
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
};
