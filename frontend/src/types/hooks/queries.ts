import {IGenre, INotesResponse} from "../api";

export interface IUseGenresReturn {
    genres: IGenre[];
    isLoadingGenres: boolean;
    isErrorGenres: boolean;
}

export interface IUseNotesReturn {
    data?: INotesResponse;
    isLoading: boolean;
    isError: boolean;
}
