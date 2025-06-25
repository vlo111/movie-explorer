import {PopularMovies} from "./PopularMovies.tsx";
import {DiscoverMovies} from "./DiscoverMovies.tsx";
import {SearchMovies} from "./SearchMovies.tsx";
import {IMovieDisplayProps} from "../../../types/components";

export function MovieDisplay({ searchTerm, filters, page, onPageChange }: IMovieDisplayProps) {
    const hasSearch = searchTerm.trim().length > 0;
    const hasFilters = Object.keys(filters).length > 0;

    if (hasSearch) {
        return <SearchMovies searchTerm={searchTerm} page={page} onPageChange={onPageChange} />;
    }

    if (hasFilters) {
        return <DiscoverMovies filters={filters} page={page} onPageChange={onPageChange} />;
    }

    return <PopularMovies page={page} onPageChange={onPageChange} />;
}
