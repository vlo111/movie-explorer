import {IGenre, IMovie, IPaginatedResponse} from "@/types";


export interface IMovieListResponse extends IPaginatedResponse<IMovie> {}

export interface IGenreListResponse {
    genres: IGenre[];
}
