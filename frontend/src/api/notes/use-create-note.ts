import {useMutation, useQueryClient} from "@tanstack/react-query";
import {noteService} from "../../services/noteService.ts";
import {ICreateNoteMutation} from "../../types/hooks";

export const useCreateNote = (): ICreateNoteMutation => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: noteService.createNote,
        onSuccess: (newNote) => {
            // Invalidate notes list
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            // Update movie note cache
            queryClient.setQueryData(['note', 'movie', newNote.movie_id], newNote);
        }
    });
};
