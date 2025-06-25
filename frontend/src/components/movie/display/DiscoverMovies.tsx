import {IDiscoverMoviesProps} from "../../../types/components";
import {useDiscoverMovies} from "../../../api/movies/use-discover-movies.ts";
import {fallbackError} from "../../../helpers/utils.ts";
import {IMovie} from "../../../types/api";
import MovieCard from "../MovieCard.tsx";
import Pagination from "../../general/Pagination.tsx";

export function DiscoverMovies({ filters, page, onPageChange }: IDiscoverMoviesProps) {
    const { discoverData, isLoadingDiscover, isErrorDiscover } = useDiscoverMovies(filters, page);

    if (isLoadingDiscover) {
        return (
            <div className="loading">
                <div className="spinner"/>
                <p>Loading filtered movies...</p>
            </div>
        );
    }

    if (isErrorDiscover) {
        return (
            <div className="message error">
                {fallbackError('filtered movies')}
            </div>
        );
    }

    const movies = discoverData?.results ?? [];
    const totalPages = discoverData?.total_pages ?? 1;
    const isEmpty = movies.length === 0;

    if (isEmpty) {
        return (
            <div className="message">
                <h3>No movies found</h3>
                <p>Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div className="movie-section">
            <div className="discover-info">
                <h3>Filtered Results</h3>
                <p>{discoverData?.total_results} movies match your criteria</p>
            </div>

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
