import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from "../services/apiService";

interface MovieCardProps {
    movie: any;
}

function MovieCard({ movie }: MovieCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <div className="card" onClick={handleClick}>
            <div className="card-image">
                <img src={getImageUrl(movie.poster_path)} alt={movie.title}/>
                <div className="tag" style={{position: 'absolute', top: '10px', right: '10px'}}>
                    ⭐ {movie.vote_average.toFixed(1)}
                </div>
            </div>
            <div className="card-content">
                <h3 className="card-title">{movie.title}</h3>
                <p className="card-subtitle">{new Date(movie.release_date).getFullYear()}</p>
                <p className="card-text">
                    {movie.overview ? movie.overview.slice(0, 100) + '...' : 'No description available'}
                </p>
            </div>
        </div>
    );
}

export default MovieCard;
