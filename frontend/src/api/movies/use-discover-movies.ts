import { useQuery } from '@tanstack/react-query';
import { discoverMovies } from '../../services/apiService.ts';
import {IDiscoverFilters} from "../../types/api";
import {selectResponseData} from "../../helpers/utils.ts";

export const useDiscoverMovies = (filters: IDiscoverFilters, page: number) => {
    const options = {
        queryKey: ['discover', filters, page],
        queryFn: () => discoverMovies(filters, page),
        keepPreviousData: true,
        select: (data) => selectResponseData(data),
    };

    const { data, isLoading, isError } = useQuery(options);

    return {
        discoverData: data,
        isLoadingDiscover: isLoading,
        isErrorDiscover: isError
    };
};
