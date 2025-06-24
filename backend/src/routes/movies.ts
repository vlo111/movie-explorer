import { Router } from 'express';
import { MovieController } from '@/controllers/MovieController';

const router = Router();

// GET /api/movies/search?q=query&page=1
router.get('/search', MovieController.search);

router.get('/popular', MovieController.popular);

// GET /api/movies/genres
router.get('/genres', MovieController.genres);

// GET /api/movies/discover?with_genres=28&year=2023&page=1
router.get('/discover', MovieController.discover);

// GET /api/movies/:id
router.get('/:id', MovieController.details);

export { router as movies };
