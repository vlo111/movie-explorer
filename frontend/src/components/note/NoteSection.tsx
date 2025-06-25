import React, { useState } from 'react';
import NoteForm from "./NoteForm.tsx";
import {useNoteByMovieId} from "../../api/notes/use-get-note-by-id.ts";
import {useUpdateNote} from "../../api/notes/use-update-note.ts";
import {useCreateNote} from "../../api/notes/use-create-note.ts";
import {INoteSectionProps} from "../../types/components";
import {INote, INoteCreate} from "../../types/api";
import RateSVG from '../../assets/icon/star.svg'

export const NoteSection: React.FC<INoteSectionProps > = ({ movie }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { data: existingNote, isLoading } = useNoteByMovieId(movie.id);
    const createNoteMutation = useCreateNote();
    const updateNoteMutation = useUpdateNote();

    const handleCreateNote = (data: INoteCreate) => {
        createNoteMutation.mutate(data, {
            onSuccess: () => setIsEditing(false)
        });
    };

    const handleUpdateNote = (data: INote) => {
        if (existingNote) {
            updateNoteMutation.mutate(
                { id: existingNote.id, data },
                { onSuccess: () => setIsEditing(false) }
            );
        }
    };

    if (isLoading) {
        return <div className="loading-centered">Loading note...</div>;
    }

    return (
        <div className="note-section">
            <h3>
                {existingNote ? 'Your Review' : 'Add Review'}
            </h3>

            {existingNote && !isEditing ? (
                <div>
                    {existingNote.rating && (
                        <div className="note-display-rating">
                            <span>
                                <RateSVG /> {existingNote.rating}/10
                            </span>
                        </div>
                    )}

                    <p className="note-display-text">
                        {existingNote.content}
                    </p>

                    <div className="note-display-footer">
                        <span>
                            Created: {new Date(existingNote.created_at).toLocaleDateString()}
                        </span>

                        <button
                            className="btn btn-small"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Review
                        </button>
                    </div>
                </div>
            ) : (
                <NoteForm
                    note={existingNote}
                    movieId={movie.id}
                    movieTitle={movie.title}
                    moviePoster={movie.poster_path}
                    onSubmit={existingNote ? handleUpdateNote : handleCreateNote}
                    onCancel={() => setIsEditing(false)}
                    isLoading={createNoteMutation.isPending || updateNoteMutation.isPending}
                />
            )}
        </div>
    );
};
