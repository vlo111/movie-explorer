import { useQuery } from '@tanstack/react-query';
import {searchMovies} from '../../services/apiService.ts';
import {LIMIT_MOVIE} from "../../helpers/constants.ts";

export const useSearchMovies = (search: string, page: number) => {

    const options = {
        queryKey: ['search', search, page],
        queryFn: () => searchMovies(search, page),
        enabled: !!search,
        keepPreviousData: true,
        select: (data) => ({
            ...data,
            results: data.results.slice(0, LIMIT_MOVIE),
        }),
    }

    const { data: searchData, isLoading: isLoadingSearch, isError: isErrorSearch} = useQuery(options);

    return { searchData, isLoadingSearch, isErrorSearch }
};
