import { useQuery } from '@tanstack/react-query';
import {popularMovies} from '../services/apiService';

export const useGetPopularMovies = (page) => {
    const options = {
        queryKey: ["popular", page],
        queryFn: () => popularMovies(page),
        keepPreviousData: true,
        select: (data) => ({
            ...data,
            results: data.results.slice(0, 8),
        }),
    }

    const { data: popularData, isLoading: isLoadingPopular, isError: isErrorPopular} = useQuery(options);

    return { popularData, isLoadingPopular, isErrorPopular }
};
