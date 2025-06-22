import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { popular, search as searchApi } from '../services/apiService';
import MovieCard from '../components/MovieCard';
import { GENRES } from '../helpers/constants';
import {useDebounce} from "../hooks/useDebounce.ts";

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 700);
    const [currentSearch, setCurrentSearch] = useState('');
    const navigate = useNavigate();

    const {
        data: popularMovies,
        isLoading: loadingPopular,
        isError: popularError,
    } = useQuery({
        queryKey: ['popular'],
        queryFn: () => popular(1),
        enabled: !debouncedSearchTerm,
    });

    const {
        data: searchResults,
        isLoading: loadingSearch,
        isError: searchError,
    } = useQuery({
        queryKey: ['search', debouncedSearchTerm],
        queryFn: () => searchApi(debouncedSearchTerm),
        enabled: !!debouncedSearchTerm,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const term = debouncedSearchTerm.trim();
        if (term.length > 1) {
            setCurrentSearch(term);
        }
    };

    const handleGenreClick = (genre: string) => {
        navigate(`/genre/${genre.toLowerCase()}`);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setCurrentSearch('');
    };

    const movies = searchTerm ? searchResults?.results || [] : popularMovies?.results || [];

    return (
        <div className="container">
            <section style={{marginBottom: '40px'}}>
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
                    <span style={{color: 'rgba(255, 255, 255, 0.8)', marginRight: '15px'}}>Genres:</span>
                    {GENRES.map((genre) => (
                        <button
                            key={genre}
                            className="btn"
                            onClick={() => handleGenreClick(genre)}
                        >
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
                            style={{marginLeft: '15px', padding: '8px 16px', fontSize: '0.9rem'}}
                        >
                            Clear
                        </button>
                    </div>
                )}
            </section>

            {(loadingPopular || loadingSearch) && (
                <div className="loading">
                    <div className="spinner" />
                    <p>Loading movies...</p>
                </div>
            )}

            {(popularError || searchError) && (
                <div className="message error">
                    Something went wrong.
                </div>
            )}

            {!loadingPopular && !loadingSearch && movies.length === 0 && currentSearch && (
                <div className="message">
                    <h3>No results for "{currentSearch}"</h3>
                    <button className="btn" onClick={clearSearch} style={{marginTop: '15px'}}>
                        Back to Popular
                    </button>
                </div>
            )}

            <div className="grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default Home;
