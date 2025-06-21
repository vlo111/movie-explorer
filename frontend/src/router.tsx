import { Outlet, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorNotFound from './components/ErrorNotFound';
import Home from './pages/Home';
import GenrePage from './pages/GenrePage';
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
            { path: PATHS.GENRE, element: <GenrePage /> },
            { path: PATHS.MOVIE, element: <MoviePage /> },
        ],
    },
]);
