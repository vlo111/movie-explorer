import { Request, Response, NextFunction } from 'express';
import { getMovies, getMovie, getPopular, getRecs } from '@/services/TMDBApi';

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
        } catch (err: any) {
            if (err.status === 404 || err.response?.status === 404) {
                res.status(404).json({ message: 'Not found' });
            } else {
                next(err);
            }
        }
    },

    async recs(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        const page = Number(req.query.page) || 1;

        if (!id) {
            res.status(400).json({ message: 'Invalid ID' });
            return;
        }

        try {
            const data = await getRecs(id, page);
            res.json(data);
        } catch (err: any) {
            next(err);
        }
    },
};
