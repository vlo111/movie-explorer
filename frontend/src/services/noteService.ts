import {INote, INoteCreate, INoteUpdate} from "../types/api";

const NOTES_STORAGE_KEY = 'movie_notes';

let nextId = 1;

const getStoredNotes = (): INote[] => {
    try {
        const stored = localStorage.getItem(NOTES_STORAGE_KEY);
        if (stored) {
            const notes = JSON.parse(stored);
            // Update nextId to avoid conflicts
            if (notes.length > 0) {
                nextId = Math.max(...notes.map(n => n.id)) + 1;
            }
            return notes;
        }
    } catch (error) {
        console.error('Failed to load notes from localStorage:', error);
    }
    return [];
};

const saveNotesToStorage = (notes: INote[]) => {
    try {
        localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
        console.error('Failed to save notes to localStorage:', error);
    }
};

let notesStore: INote[] = getStoredNotes();

export const noteService = {
    async getNotes(page = 1, limit = 20): Promise<{ notes: INote[], total: number }> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedNotes = notesStore.slice(startIndex, endIndex);

        return {
            notes: paginatedNotes,
            total: notesStore.length
        };
    },

    async getNote(id: number): Promise<INote> {
        await new Promise(resolve => setTimeout(resolve, 100));

        const note = notesStore.find(n => n.id === id);
        if (!note) {
            throw new Error('Note not found');
        }
        return note;
    },

    async getNoteByMovieId(movieId: number): Promise<INote | null> {
        await new Promise(resolve => setTimeout(resolve, 100));

        const note = notesStore.find(n => n.movie_id === movieId);
        return note || null;
    },

    async createNote(noteData: INoteCreate): Promise<INote> {
        await new Promise(resolve => setTimeout(resolve, 100));

        const now = new Date().toISOString();
        const newNote: INote = {
            id: nextId++,
            ...noteData,
            created_at: now,
            updated_at: now
        };

        notesStore.unshift(newNote);
        saveNotesToStorage(notesStore);

        return newNote;
    },

    async updateNote(id: number, updateData: INoteUpdate): Promise<INote> {
        await new Promise(resolve => setTimeout(resolve, 100));

        const index = notesStore.findIndex(n => n.id === id);
        if (index === -1) {
            throw new Error('Note not found');
        }

        const updatedNote = {
            ...notesStore[index],
            ...updateData,
            updated_at: new Date().toISOString()
        };

        notesStore[index] = updatedNote;
        saveNotesToStorage(notesStore);

        return updatedNote;
    },

    async deleteNote(id: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 100));

        const index = notesStore.findIndex(n => n.id === id);
        if (index === -1) {
            throw new Error('Note not found');
        }

        notesStore.splice(index, 1);
        saveNotesToStorage(notesStore);
    }
};
