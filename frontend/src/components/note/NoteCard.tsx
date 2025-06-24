import React from 'react';
import { getImageUrl } from '../../services/apiService.ts';
import {INoteCardProps} from "../../types";
import RateSVG from "../../assets/icon/star.svg";
import {useNavigate} from "react-router-dom";
import {INote} from "../../types/api";
import {PATHS} from "../../helpers/constants.ts";

export const NoteCard: React.FC<INoteCardProps> = ({ note, onDelete }) => {


    const navigate = useNavigate();
    const handleEdit = (note: INote) => {
        navigate(PATHS.MOVIE.replace(':id', `${note.movie_id}`));
    };

    return (
        <div className="card card-no-hover">
            <div className="note-card-container">
                {note.movie_poster && (
                    <img
                        src={getImageUrl(note.movie_poster, 'w154')}
                        alt={note.movie_title}
                        className="note-movie-poster"
                    />
                )}

                <div className="note-content">
                    <h3 className="card-title">
                        {note.movie_title}
                    </h3>

                    {note.rating && (
                        <div className="note-rating">
                            <span className="note-rating-stars">
                                <RateSVG /> {note.rating}/10
                            </span>
                        </div>
                    )}

                    <p className="card-text note-text">
                        {note.content}
                    </p>

                    <div className="note-footer">
                        <span>
                            {new Date(note.created_at).toLocaleDateString()}
                        </span>

                        <div className="note-actions">
                            <button
                                className="btn btn-secondary btn-small"
                                onClick={() => handleEdit(note)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-small"
                                onClick={() => onDelete(note.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
