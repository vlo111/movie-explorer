import express from 'express';
import { movies } from './movies';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        success: 'ok'
    });
});

router.use('/movies', movies);

export default router;
