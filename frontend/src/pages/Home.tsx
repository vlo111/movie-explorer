import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useGetPopularMovies } from '../api/movies/use-get-popular-movies.ts';
import { useSearchMovies } from '../api/movies/use-search-movies.ts';
import Pagination from '../components/general/Pagination.tsx';
import MovieCard from '../components/movie/MovieCard.tsx';
import { useMovieState } from "../hooks/useMovieState";
import {fallbackError} from "../helpers/utils";
import DiscoverFilters from "../components/movie/DiscoverFilters.tsx";
import {useDiscoverMovies} from "../api/movies/use-discover-movies.ts";
import {IHomeState} from "../types/hooks";

function Home() {
    const [state, setState] = useState<IHomeState>({
        page: 1,
        searchTerm: '',
        currentSearch: '',
        filters: {}
    });

    const debouncedSearch = useDebounce(state.searchTerm, 700);

    useEffect(() => {
        if (debouncedSearch.trim().length > 0 && Object.keys(state.filters).length > 0) {
            setState(prev => ({ ...prev, filters: {} }));
        }
    }, [debouncedSearch]);

    const { discoverData, isLoadingDiscover, isErrorDiscover } = useDiscoverMovies(state.filters, state.page);
    const { popularData } = useGetPopularMovies(state.page);
    const { searchData, isLoadingSearch, isErrorSearch } = useSearchMovies(debouncedSearch, state.page);

    const { movies, totalPages, isLoading, isError, isEmpty } =
        useMovieState({
            searchTerm: debouncedSearch,
            filters: state.filters,
            searchData,
            discoverData,
            popularData,
            isLoadingSearch,
            isLoadingDiscover,
            isErrorSearch,
            isErrorDiscover
        });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const term = debouncedSearch.trim();
        if (term.length > 1) {
            setState(prev => ({
                ...prev,
                currentSearch: term,
                page: 1,
                filters: Object.keys(prev.filters).length > 0 ? {} : prev.filters
            }));
        }
    };

    const handleFiltersChange = (newFilters) => {
        setState(prev => ({
            ...prev,
            filters: newFilters,
            page: 1,
            searchTerm: prev.searchTerm.trim().length > 0 || prev.currentSearch.length > 0 ? '' : prev.searchTerm,
            currentSearch: prev.searchTerm.trim().length > 0 || prev.currentSearch.length > 0 ? '' : prev.currentSearch
        }));
    };

    const handlePageChange = (newPage: number) => {
        setState(prev => ({ ...prev, page: newPage }));
    };

    const handleSearchTermChange = (term: string) => {
        setState(prev => ({ ...prev, searchTerm: term }));
    };

    return (
        <React.Fragment>
            <section className="search-section">
                <form onSubmit={handleSearch} className="search-box">
                    <input
                        className="search-input"
                        value={state.searchTerm}
                        onChange={(e) => handleSearchTermChange(e.target.value)}
                        placeholder="Search movies..."
                    />
                    <button className="btn" disabled={state.searchTerm.trim().length < 2}>
                        Search
                    </button>
                </form>
            </section>
            <main className="home-container">
                <DiscoverFilters currentFilters={state.filters} onFiltersChange={handleFiltersChange}/>
                <div className="home-grid">
                    {isLoading && (
                        <div className="loading">
                            <div className="spinner"/>
                            <p>Loading movies...</p>
                        </div>
                    )}

                    {isError && (
                        <div className="message error">
                            {fallbackError('movie')}
                        </div>
                    )}

                    {isEmpty && (
                        <div className="message">
                            <h3>No results</h3>
                        </div>
                    )}

                    <div className="grid">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <Pagination page={state.page} totalPages={totalPages} onPageChange={handlePageChange}/>
                    )}
                </div>
            </main>
        </React.Fragment>
    );
}

export default Home;
