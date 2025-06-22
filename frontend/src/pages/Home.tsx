import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GENRES } from '../helpers/constants';
import { useDebounce } from '../hooks/useDebounce';
import { useGetPopularMovies } from '../api/use-get-popular-movies';
import { useSearchMovies } from '../api/use-search-movies';
import Pagination from '../components/Pagination';
import MovieCard from '../components/MovieCard';
import {useActiveMovieData} from "../hooks/useActiveMovieData.ts";

function Home() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 700);
    const [currentSearch, setCurrentSearch] = useState('');
    const navigate = useNavigate();

    const { popularData, isLoadingPopular, isErrorPopular } = useGetPopularMovies(page);

    const { searchData, isLoadingSearch, isErrorSearch } = useSearchMovies(debouncedSearchTerm, page);

    const { movies, totalPages } = useActiveMovieData(!!debouncedSearchTerm, searchData, popularData);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const term = debouncedSearchTerm.trim();
        if (term.length > 1) {
            setCurrentSearch(term);
            setPage(1);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setCurrentSearch('');
        setPage(1);
    };

    const handleGenreClick = (genre: string) => {
        navigate(`/genre/${genre.toLowerCase()}`);
    };

    return (
        <div className="container">
            <section style={{ marginBottom: '40px' }}>
                <form onSubmit={handleSearch} className="search-box">
                    <input
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search movies..."
                    />
                    <button className="btn" disabled={searchTerm.trim().length < 2}>
                        Search
                    </button>
                </form>

                <div className="suggestions">
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)', marginRight: '15px' }}>
                        Genres:
                    </span>
                    {GENRES.map((genre) => (
                        <button key={genre} className="btn" onClick={() => handleGenreClick(genre)}>
                            {genre}
                        </button>
                    ))}
                </div>

                {currentSearch && (
                    <div className="message">
                        Searching for: "{currentSearch}"
                        <button
                            className="btn"
                            onClick={clearSearch}
                            style={{ marginLeft: '15px', padding: '8px 16px', fontSize: '0.9rem' }}
                        >
                            Clear
                        </button>
                    </div>
                )}
            </section>

            {isLoadingSearch && (
                <div className="loading">
                    <div className="spinner" />
                    <p>Loading movies...</p>
                </div>
            )}

            {isErrorSearch && (
                <div className="message error">
                    {fallbackError('movie')}
                </div>
            )}

            {!isLoadingSearch && movies.length === 0 && currentSearch && (
                <div className="message">
                    <h3>No results for "{currentSearch}"</h3>
                    <button className="btn" onClick={clearSearch} style={{ marginTop: '15px' }}>
                        Back to Popular
                    </button>
                </div>
            )}

            <div className="grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            )}
        </div>
    );
}

export default Home;
