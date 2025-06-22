import { useQuery } from '@tanstack/react-query';
import {searchMovies} from '../services/apiService';

export const useSearchMovies = (search: string, page: number) => {

    const options = {
        queryKey: ['search', search, page],
        queryFn: () => searchMovies(search, page),
        enabled: !!search,
        keepPreviousData: true,
        select: (data) => ({
            ...data,
            results: data.results.slice(0, 8), // Limit to 8 movies
        }),
    }

    const { data: searchData, isLoading: isLoadingSearch, isError: isErrorSearch} = useQuery(options);

    return { searchData, isLoadingSearch, isErrorSearch }
};
