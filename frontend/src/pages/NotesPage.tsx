import React, { useState } from 'react';
import Pagination from '../components/general/Pagination.tsx';
import {NoteCard} from "../components/note/NoteCard.tsx";
import {useNotes} from "../api/notes/use-get-notes.ts";
import {useDeleteNote} from "../api/notes/use-delete-note.ts";
import {fallbackError} from "../helpers/utils.ts";

export const NotesPage: React.FC = () => {
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, isError } = useNotes(page, 10);
    const deleteNoteMutation = useDeleteNote();

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            deleteNoteMutation.mutate(id);
        }
    };

    if (isLoading) {
        return (
            <div className="container">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading notes...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container">
                <div className="message error">
                    {fallbackError('notes')}
                </div>
            </div>
        );
    }

    const notes = data?.notes || [];
    const totalPages = Math.ceil((data?.total || 0) / 10);

    return (
        <div className="container">
            <h1 className="notes-page-title">
                Movie Notes
            </h1>

            {notes.length === 0 ? (
                <div className="message">
                    <h3>There is No notes</h3>
                </div>
            ) : (
                <>
                    <div className="notes-list">
                        {notes.map((note) => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    )}
                </>
            )}
        </div>
    );
};
