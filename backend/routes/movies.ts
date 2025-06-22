import { Router } from 'express';
import { MovieController } from '@/controllers/MovieController';

const router = Router();

// GET /api/movies/search?q=query&page=1
router.get('/search', MovieController.search);

router.get('/popular', MovieController.popular);

// GET /api/movies/:id
router.get('/:id', MovieController.details);

// GET /api/movies/:id/recommendations?page=1
router.get('/:id/recommendations', MovieController.recs);

export { router as movies };
