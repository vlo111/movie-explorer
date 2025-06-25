import {IMovie} from "../../../types/api";
import {useSearchMovies} from "../../../api/movies/use-search-movies.ts";
import {fallbackError} from "../../../helpers/utils.ts";
import MovieCard from "../MovieCard.tsx";
import {ISearchMoviesProps} from "../../../types/components";
import Pagination from "../../general/Pagination.tsx";

export function SearchMovies({ searchTerm, page, onPageChange }: ISearchMoviesProps) {
    const { searchData, isLoadingSearch, isErrorSearch } = useSearchMovies(searchTerm, page);

    if (isLoadingSearch) {
        return (
            <div className="loading">
                <div className="spinner"/>
                <p>Searching movies...</p>
            </div>
        );
    }

    if (isErrorSearch) {
        return (
            <div className="message error">
                {fallbackError('search results')}
            </div>
        );
    }

    const movies = searchData?.results ?? [];
    const totalPages = searchData?.total_pages ?? 1;
    const isEmpty = movies.length === 0;

    if (isEmpty) {
        return (
            <div className="message">
                <h3>No results found for "{searchTerm}"</h3>
                <p>Try searching with different keywords</p>
            </div>
        );
    }

    return (
        <div className="movie-section">
            <div className="search-info">
                <h3>Search results for "{searchTerm}"</h3>
                <p>{searchData?.total_results} movies found</p>
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
