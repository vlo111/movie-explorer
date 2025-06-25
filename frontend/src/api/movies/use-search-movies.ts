import { useQuery } from '@tanstack/react-query';
import {searchMovies} from '../../services/apiService.ts';
import {selectResponseData} from "../../helpers/utils.ts";

export const useSearchMovies = (search: string, page: number) => {

    const options = {
        queryKey: ['search', search, page],
        queryFn: () => searchMovies(search, page),
        enabled: !!search,
        keepPreviousData: true,
        select: (data) => selectResponseData(data),
    }

    const { data: searchData, isLoading: isLoadingSearch, isError: isErrorSearch} = useQuery(options);

    return { searchData, isLoadingSearch, isErrorSearch }
};
