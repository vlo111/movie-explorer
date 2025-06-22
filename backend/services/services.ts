import api from './api';

export async function getMovies(q: string, p = 1) {
    const res = await api.get('/search/movie', {
        params: { query: q, page: p },
    });
    return res.data;
}

export async function getPopular(p = 1) {
    const res = await api.get('/movie/popular', {
        params: { page: p },
    });
    return res.data;
}

export async function getMovie(id: number) {
    const res = await api.get(`/movie/${id}`);
    return res.data;
}

export async function discoverMovies(filters: any = {}, p = 1) {
    const res = await api.get('/discover/movie', {
        params: { ...filters, page: p },
    });
    return res.data;
}

export async function getGenres() {
    const res = await api.get('/genre/movie/list');
    return res.data;
}
