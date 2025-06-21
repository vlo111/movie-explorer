import React from 'react'
import {getImageUrl} from "../services/apiService.ts";

function MovieDetailsView({movie, setSelectedMovieId}) {
    return (
        <div className="container">
            <button className="btn" onClick={() => setSelectedMovieId(null)} style={{marginBottom: '30px'}}>
                ← Back to Movies
            </button>

            <div style={{padding: '40px', background: '#FFFFFF26'}}>
                <div style={{display: 'flex', gap: '40px', flexWrap: 'wrap'}}>
                    <div style={{flexShrink: 0, width: '300px'}}>
                        <img
                            src={getImageUrl(movie.poster_path)}
                            alt={movie.title}
                            style={{width: '100%', borderRadius: '15px'}}
                        />
                    </div>

                    <div style={{flex: 1, minWidth: '300px'}}>
                        <h1 className="card-title" style={{fontSize: '2.5rem', marginBottom: '10px'}}>
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className="card-subtitle" style={{fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '20px'}}>
                                "{movie.tagline}"
                            </p>
                        )}

                        <div className="stats">
                            <div className="stat">
                                <span className="stat-value">⭐ {movie.vote_average}</span>
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

                        <div style={{marginTop: '30px'}}>
                            <h3 style={{marginBottom: '15px', color: 'white'}}>Overview</h3>
                            <p className="card-text" style={{fontSize: '1rem', lineHeight: '1.6'}}>
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailsView
