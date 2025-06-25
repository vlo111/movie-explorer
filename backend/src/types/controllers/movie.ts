import {IGenre, IMovie, IPaginatedResponse} from "@/types";

export type MovieListResponse = IPaginatedResponse<IMovie>;

export interface IGenreListResponse {
    genres: IGenre[];
}
