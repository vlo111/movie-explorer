import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../services/apiService';
import MovieCard from '../components/MovieCard';
import { GENRES } from '../helpers/constants';
import {useSearchMovies} from "../api/use-search-movies.ts";
import Pagination from "../components/Pagination.tsx";
import {useActiveMovieData} from "../hooks/useActiveMovieData.ts";

function GenrePage() {
    const [page, setPage] = useState(1);
    const { genre } = useParams<{ genre: string }>();
    const navigate = useNavigate();

    const { searchData, isLoadingSearch, isErrorSearch } = useSearchMovies(genre ?? '', page);

    const { movies, totalPages } = useActiveMovieData(!!genre, searchData);

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleGenreClick = (selectedGenre: string) => {
        navigate(`/genre/${selectedGenre.toLowerCase()}`);
    };

    return (
        <div className="container">
            <div style={{marginBottom: '40px'}}>
                <button className="btn" onClick={handleBackToHome} style={{marginBottom: '20px'}}>
                    ← Back to Home
                </button>

                <div className="header" style={{padding: '20px'}}>
                    <h2 style={{fontSize: '2rem', textTransform: 'capitalize', color: 'white'}}>
                        {genre} Movies
                    </h2>
                </div>

                <div className="suggestions">
                    <span style={{color: 'rgba(255, 255, 255, 0.8)', marginRight: '15px'}}>Other genres:</span>
                    {GENRES.filter(g => g.toLowerCase() !== genre?.toLowerCase()).map((g) => (
                        <button
                            className="btn"
                            key={g}
                            onClick={() => handleGenreClick(g)}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            {isLoadingSearch && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading {genre} movies...</p>
                </div>
            )}

            {isErrorSearch && (
                <div className="message error">
                    {fallbackError(genre)}
                </div>
            )}

            {!isLoadingSearch && movies.length === 0 && (
                <div className="message">
                    <h3>No movies found</h3>
                </div>
            )}

            <div className="grid">
                {movies.map((movie: any) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            {totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            )}
        </div>
    );
}

export default GenrePage;
