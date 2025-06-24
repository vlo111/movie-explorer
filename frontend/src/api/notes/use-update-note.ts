import {useMutation, useQueryClient} from "@tanstack/react-query";
import {noteService} from "../../services/noteService.ts";
import {IUpdateNoteMutation} from "../../types/hooks";
import {INoteUpdate} from "../../types/api";

export const useUpdateNote = (): IUpdateNoteMutation => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: INoteUpdate }) =>
            noteService.updateNote(id, data),
        onSuccess: (updatedNote) => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            queryClient.setQueryData(['note', updatedNote.id], updatedNote);
            queryClient.setQueryData(['note', 'movie', updatedNote.movie_id], updatedNote);
        }
    });
};
