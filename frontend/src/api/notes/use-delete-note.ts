import {useMutation, useQueryClient} from "@tanstack/react-query";
import {noteService} from "../../services/noteService.ts";
import {IDeleteNoteMutation} from "../../types/hooks";

export const useDeleteNote = (): IDeleteNoteMutation => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: noteService.deleteNote,
        onSuccess: (_, deletedId) => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            queryClient.removeQueries({ queryKey: ['note', deletedId] });
        }
    });
};
