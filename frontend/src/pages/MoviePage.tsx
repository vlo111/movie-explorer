import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { details as getDetails } from '../services/apiService';
import MovieDetailsView from '../components/MovieDetailsView';

function MoviePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const movieId = id ? parseInt(id) : null;

    const {
        data: movieDetails,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['details', movieId],
        queryFn: () => getDetails(movieId!),
        enabled: movieId !== null
    });

    const handleBack = () => {
        navigate(-1);
    };

    if (isLoading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Loading movie details...</p>
            </div>
        );
    }

    if (isError || !movieDetails) {
        return (
            <div className="message error">
                {fallbackError('movie')}
            </div>
        );
    }

    return <MovieDetailsView movie={movieDetails} setSelectedMovieId={handleBack} />;
}

export default MoviePage;
