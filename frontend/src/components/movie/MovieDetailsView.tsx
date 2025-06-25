import React from 'react'
import {getImageUrl} from "../../services/apiService.ts";
import { NoteSection } from '../note/NoteSection.tsx';
import {IMovieDetailsViewProps} from "../../types/components";
import RateSVG from "../../assets/icon/star.svg";

const MovieDetailsView: React.FC<IMovieDetailsViewProps> = ({ movie, setSelectedMovieId }) => {
    return (
        <div className="container">
            <button className="btn" onClick={() => setSelectedMovieId(null)}>
                ← Back to
            </button>

            <div className="movie-details-container">
                <div className="movie-details-content">
                    <div className="movie-poster-container">
                        <img
                            src={getImageUrl(movie.poster_path)}
                            alt={movie.title}
                            className="movie-poster"
                        />
                    </div>

                    <div className="movie-info">
                        <h1 className="card-title card-title-large">
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className="card-subtitle card-subtitle-italic">
                                "{movie.tagline}"
                            </p>
                        )}

                        <div className="stats">
                            <div className="stat">
                                <span className="stat-value"><RateSVG style={{scale: 2}} /> {movie.vote_average}</span>
                                <span className="stat-label">Rating</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{new Date(movie.release_date).getFullYear()}</span>
                                <span className="stat-label">Release</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{movie.runtime || 'N/A'}</span>
                                <span className="stat-label">Runtime (min)</span>
                            </div>
                        </div>

                        <div className="movie-overview">
                            <h3>Overview</h3>
                            <p className="card-text card-text-large">
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                </div>
                <NoteSection movie={movie} />
            </div>
        </div>
    )
}

export default React.memo(MovieDetailsView);
