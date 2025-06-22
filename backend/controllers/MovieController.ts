import { Request, Response, NextFunction } from 'express';
import {getMovies, getMovie, getPopular, discoverMovies, getGenres} from '@/services/services';
import {IDiscoverMovieFilters} from "@/types";

export const MovieController = {
    async search(req: Request, res: Response, next: NextFunction) {
        const { q, page } = req.query;

        if (!q) {
            res.status(400).json({ message: 'Missing search query' });
            return;
        }

        try {
            const data = await getMovies(String(q), Number(page) || 1);
            res.json(data);
        } catch (err) {
            console.log('search error:', err);
            next(err);
        }
    },

    async popular(req: Request, res: Response, next: NextFunction) {
        try {
            const page = Number(req.query.page) || 1;
            const data = await getPopular(page);
            res.json(data);
        } catch (err) {
            next(err);
        }
    },

    async details(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);

        if (!id) {
            res.status(400).json({ message: 'Invalid movie ID' });
            return;
        }

        try {
            const movie = await getMovie(id);
            res.json(movie);
        } catch (err) {
            if (err.status === 404 || err.response?.status === 404) {
                res.status(404).json({ message: 'Not found' });
            } else {
                next(err);
            }
        }
    },

    async discover(req: Request, res: Response, next: NextFunction) {
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

            if (vote_average_gte) filters['vote_average.gte'] = Number(vote_average_gte);
            if (vote_average_lte) filters['vote_average.lte'] = Number(vote_average_lte);

            if (with_runtime_gte) filters['with_runtime.gte'] = Number(with_runtime_gte);
            if (with_runtime_lte) filters['with_runtime.lte'] = Number(with_runtime_lte);

            if (sort_by) filters.sort_by = sort_by;

            const data = await discoverMovies(filters, page);
            res.json(data);
        } catch (err) {
            next(err);
        }
    },


    async genres(req: Request, res: Response, next: NextFunction) {
        console.log('get genre')
        try {
            const data = await getGenres();
            res.json(data);
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
};
