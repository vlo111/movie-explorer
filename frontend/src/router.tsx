import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorNotFound from './components/ErrorNotFound';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import { PATHS } from './helpers/constants';

export const router = createBrowserRouter([
    {
        path: '*',
        element: <ErrorNotFound />,
    },
    {
        element: <Layout />,
        children: [
            { path: PATHS.ROOT, element: <Home /> },
            { path: PATHS.MOVIE, element: <MoviePage /> },
        ],
    },
]);
