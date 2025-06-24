import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from "../../services/apiService.ts";
import {IMovieCardProps} from "../../types";
import {PATHS} from "../../helpers/constants.ts";
import RateSVG from '../../assets/icon/star.svg'

const MovieCard: React.FC<IMovieCardProps> = ({ movie }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(PATHS.MOVIE.replace(':id', `${movie.id}`));
    };

    return (
        <div className="card" onClick={handleClick}>
            <div className="card-image">
                <img src={getImageUrl(movie.poster_path)} alt={movie.title}/>
                <div className="tag">
                    <RateSVG />
                    {movie.vote_average.toFixed(1)}
                </div>
            </div>
            <div className="card-content">
                <h3 className="card-title">{movie.title}</h3>
                <p className="card-subtitle">{new Date(movie.release_date).getFullYear()}</p>
                <p className="card-text">
                    {movie.overview ? movie.overview.slice(0, 100) + '...' : 'No description'}
                </p>
            </div>
        </div>
    );
}

export default MovieCard;
