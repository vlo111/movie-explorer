import React, { useState } from 'react';
import {INoteFormProps} from "../../types/components";
import {INoteCreate, INoteUpdate} from "../../types/api";

const NoteForm: React.FC<INoteFormProps> = (props) => {
    const {
        note,
        onSubmit, onCancel,
        movieId, movieTitle, moviePoster,
        isLoading = false } = props;

    const [content, setContent] = useState(note?.content || '');
    const [rating, setRating] = useState(note?.rating || 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) return;

        const data: INoteCreate | INoteUpdate = note
            ? { content, rating: rating || undefined }
            : {
                movie_id: movieId!,
                content,
                rating: rating || undefined,
                movie_title: movieTitle,
                movie_poster: moviePoster
            };

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <div className="note-form-group">
                <label className="note-form-label">
                    Rating (1-10)
                </label>
                <div className="note-rating-buttons">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <button
                            key={num}
                            type="button"
                            onClick={() => setRating(num)}
                            className={`note-rating-button ${rating >= num ? 'active' : ''}`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>

            <div className="note-form-group">
                <label className="note-form-label">
                    Your Review
                </label>
                <textarea
                    value={content as string}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write review here..."
                    rows={6}
                    className="note-textarea"
                    required
                />
            </div>

            <div className="note-form-actions">
                <button
                    type="submit"
                    className="btn"
                    disabled={isLoading || !content.trim()}
                >
                    {isLoading ? 'Saving...' : note ? 'Update Note' : 'Save Note'}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default NoteForm;
