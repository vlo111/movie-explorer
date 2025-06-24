import {noteService} from "../../services/noteService.ts";
import {useQuery} from "@tanstack/react-query";
import {IUseNotesReturn} from "../../types/hooks";

export const useNotes = (page = 1, limit = 20): IUseNotesReturn => {
    const options = {
        queryKey: ['notes', page, limit],
        queryFn: () => noteService.getNotes(page, limit),
        keepPreviousData: true
    }
    return useQuery(options);
};
