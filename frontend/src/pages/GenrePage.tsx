import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { search as searchApi } from '../services/apiService';
import MovieCard from '../components/MovieCard';
import { GENRES } from '../helpers/constants';

function GenrePage() {
    const { genre } = useParams<{ genre: string }>();
    const navigate = useNavigate();

    const {
        data: genreMovies,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['genre', genre],
        queryFn: () => searchApi(genre || ''),
        enabled: !!genre
    });

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleGenreClick = (selectedGenre: string) => {
        navigate(`/genre/${selectedGenre.toLowerCase()}`);
    };

    const movies = genreMovies?.results || [];

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

            {isLoading && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading {genre} movies...</p>
                </div>
            )}

            {isError && (
                <div className="message error">
                    {fallbackError(genre)}
                </div>
            )}

            {!isLoading && movies.length === 0 && (
                <div className="message">
                    <h3>No movies found</h3>
                </div>
            )}

            <div className="grid">
                {movies.map((movie: any) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default GenrePage;
