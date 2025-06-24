import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/general/Layout.tsx';
import ErrorNotFound from './components/general/ErrorNotFound.tsx';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import { NotesPage } from './pages/NotesPage';
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
            { path: PATHS.NOTES, element: <NotesPage /> }
        ],
    },
]);
