import { useQuery } from '@tanstack/react-query';
import { getGenres } from '../services/apiService';

export const useGenres = () => {
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
