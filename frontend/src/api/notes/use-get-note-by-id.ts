import {useQuery} from "@tanstack/react-query";
import {noteService} from "../../services/noteService.ts";

export const useNoteByMovieId = (movieId: number) => {
    return useQuery({
        queryKey: ['note', 'movie', movieId],
        queryFn: () => noteService.getNoteByMovieId(movieId),
        enabled: !!movieId
    });
}
