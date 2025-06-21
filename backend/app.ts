import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index';
import createError from 'http-errors';
import morgan from 'morgan';

const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
};

// Basic middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// API routes
app.use('/api', indexRouter);

// 404 handler
app.use((req, res, next) => {
    next(createError(404, `Route ${req.originalUrl} not found`));
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response) => {
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        status: 'error',
        message: err.message,
        statusCode,
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
            path: req.originalUrl,
            method: req.method
        })
    });
});

export default app;
