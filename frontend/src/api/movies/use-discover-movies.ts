import { useQuery } from '@tanstack/react-query';
import { discoverMovies } from '../../services/apiService.ts';
import {IDiscoverFilters} from "../../types/api";
import {LIMIT_MOVIE} from "../../helpers/constants.ts";

export const useDiscoverMovies = (filters: IDiscoverFilters, page: number) => {
    const options = {
        queryKey: ['discover', filters, page],
        queryFn: () => discoverMovies(filters, page),
        keepPreviousData: true,
        select: (data) => ({
            ...data,
            results: data.results.slice(0, LIMIT_MOVIE),
        }),
    };

    const { data, isLoading, isError } = useQuery(options);

    return {
        discoverData: data,
        isLoadingDiscover: isLoading,
        isErrorDiscover: isError
    };
};
