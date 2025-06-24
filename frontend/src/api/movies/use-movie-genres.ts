import { useQuery } from '@tanstack/react-query';
import { getGenres } from '../../services/apiService.ts';
import {IUseGenresReturn} from "../../types/hooks";

export const useGenres = (): IUseGenresReturn => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
        select: (data) => data.genres || []
    });

    return {
        genres: data || [],
        isLoadingGenres: isLoading,
        isErrorGenres: isError
    };
};
