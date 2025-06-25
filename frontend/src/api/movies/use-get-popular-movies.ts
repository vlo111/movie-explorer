import { useQuery } from '@tanstack/react-query';
import {popularMovies} from '../../services/apiService.ts';
import {selectResponseData} from "../../helpers/utils.ts";

export const useGetPopularMovies = (page) => {
    const options = {
        queryKey: ["popular", page],
        queryFn: () => popularMovies(page),
        keepPreviousData: true,
        select: (data) => selectResponseData(data),
    }

    const { data: popularData, isLoading: isLoadingPopular, isError: isErrorPopular} = useQuery(options);

    return { popularData, isLoadingPopular, isErrorPopular }
};
