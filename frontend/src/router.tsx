import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { PATHS } from './helpers/constants';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: PATHS.ROOT, element: <Home /> },
        ],
    },
]);
