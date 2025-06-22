import { useQuery } from '@tanstack/react-query';
import { discoverMovies } from '../services/apiService';
import {IDiscoverFilters} from "../types/api.ts";

export const useDiscoverMovies = (filters: IDiscoverFilters, page: number) => {
    const options = {
        queryKey: ['discover', filters, page],
        queryFn: () => discoverMovies(filters, page),
        keepPreviousData: true,
        select: (data) => ({
            ...data,
            results: data.results || [],
        }),
    };

    const { data, isLoading, isError } = useQuery(options);

    return {
        discoverData: data,
        isLoadingDiscover: isLoading,
        isErrorDiscover: isError
    };
};
