const API_BASE = '/api';

const apiCall = async (endpoint: string) => {
    const url = `${import.meta.env.VITE_API_BASE_URL}${API_BASE}${endpoint}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (err) {
        console.error('API Error:', err);
        throw err;
    }
};

export const searchMovies = (query: string, page = 1) =>
    apiCall(`/movies/search?q=${encodeURIComponent(query)}&page=${page}`);

export const popularMovies = (page = 1) =>
    apiCall(`/movies/popular?page=${page}`);

export const details = (movieId: number) =>
    apiCall(`/movies/${movieId}`);

export const discoverMovies = (filters = {}, page = 1) => {
    const params = new URLSearchParams({
        page: page.toString(),
        ...filters
    });
    return apiCall(`/movies/discover?${params}`);
};

export const getGenres = () => apiCall('/movies/genres');

export const getImageUrl = (posterPath: string | null, size = 'w500') => {
    if (!posterPath) {
        return 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
    }
    return `https://image.tmdb.org/t/p/${size}${posterPath}`;
};
