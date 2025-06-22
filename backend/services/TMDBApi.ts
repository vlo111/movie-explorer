const API_KEY = process.env.TMDB_API_KEY;
const BASE = process.env.TMDB_BASE_URL;

if (!API_KEY) {
    console.log('no TMDB_API_KEY, check .env');
    process.exit(1);
}

export async function getMovies(q: string, p = 1) {
    const url = `${BASE}/search/movie?api_key=${API_KEY}&query=${q}&page=${p}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('failed');
    return res.json();
}

export async function getPopular(p = 1) {
    const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}&page=${p}`);
    if (!res.ok) throw new Error('popular movies failed');
    return res.json();
}

export async function getMovie(id: number) {
    const res = await fetch(`${BASE}/movie/${id}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error('get movie failed');
    return res.json();
}

export async function getRecs(id: number, p = 1) {
    const res = await fetch(`${BASE}/movie/${id}/recommendations?api_key=${API_KEY}&page=${p}`);
    if (!res.ok) throw new Error('recs failed');
    return res.json();
}
