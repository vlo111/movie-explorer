import Pagination from "../../general/Pagination.tsx";
import MovieCard from "../MovieCard.tsx";
import {IMovie} from "../../../types/api";
import {fallbackError} from "../../../helpers/utils.ts";
import {useGetPopularMovies} from "../../../api/movies/use-get-popular-movies.ts";
import {IMovieListProps} from "../../../types/components";

export function PopularMovies({ page, onPageChange }: IMovieListProps) {
    const { popularData, isLoading, isError } = useGetPopularMovies(page);
debugger
    if (isLoading) {
        return (
            <div className="loading">
                <div className="spinner"/>
                <p>Loading popular movies...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="message error">
                {fallbackError('popular movies')}
            </div>
        );
    }

    const movies = popularData?.results ?? [];
    const totalPages = popularData?.total_pages ?? 1;

    return (
        <div className="movie-section">
            <div className="grid">
                {movies.map((movie: IMovie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
}

