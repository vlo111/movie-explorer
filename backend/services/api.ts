import axios from 'axios';

const API_KEY = process.env.TMDB_API_KEY;
const BASE = process.env.TMDB_BASE_URL;

if (!API_KEY) {
    console.log('no TMDB_API_KEY, check .env');
    process.exit(1);
}

const api = axios.create({
    baseURL: BASE,
    params: { api_key: API_KEY },
});

api.interceptors.response.use(
    res => res,
    err => {
        console.error('API Error:', err.response?.statusText || err.message);
        return Promise.reject(err);
    }
);

export default api;
