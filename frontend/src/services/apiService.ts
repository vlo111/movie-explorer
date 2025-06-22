const API_BASE = '/api';

const apiCall = async (endpoint: string) => {
    const url = `${import.meta.env.VITE_API_BASE_URL}${API_BASE}${endpoint}`;
    console.log('API call:', url); // Debug log

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

export const search = (query: string, page = 1) =>
    apiCall(`/movies/search?q=${encodeURIComponent(query)}&page=${page}`);

export const popular = (page = 1) =>
    apiCall(`/movies/popular?page=${page}`);

export const details = (movieId: number) =>
    apiCall(`/movies/${movieId}`);

export const recs = (movieId: number, page = 1) =>
    apiCall(`/movies/${movieId}/recommendations?page=${page}`);

// Handle missing poster images - TMDB sometimes returns null
export const getImageUrl = (posterPath: string | null, size = 'w500') => {
    if (!posterPath) {
        // Using this default image for now, add a fallback image later
        return 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
    }
    return `https://image.tmdb.org/t/p/${size}${posterPath}`;
};
