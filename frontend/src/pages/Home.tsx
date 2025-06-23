import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useGetPopularMovies } from '../api/use-get-popular-movies';
import { useSearchMovies } from '../api/use-search-movies';
import Pagination from '../components/Pagination';
import MovieCard from '../components/MovieCard';
import { useMovieState } from "../hooks/useMovieState";
import {fallbackError} from "../helpers/utils";
import DiscoverFilters from "../components/DiscoverFilters";
import {useDiscoverMovies} from "../api/use-discover-movies";

function Home() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 700);
    const [currentSearch, setCurrentSearch] = useState('');
    const [filters, setFilters] = useState({});

    useEffect(() => {
        if (debouncedSearch.trim().length > 0 && Object.keys(filters).length > 0) {
            setFilters({});
        }
    }, [debouncedSearch]);

    const { discoverData, isLoadingDiscover, isErrorDiscover } = useDiscoverMovies(filters, page);
    const { popularData } = useGetPopularMovies(page);
    const { searchData, isLoadingSearch, isErrorSearch } = useSearchMovies(debouncedSearch, page);

    const { movies, totalPages, isLoading, isError, isEmpty } =
        useMovieState({
            searchTerm: debouncedSearch,
            filters, searchData, discoverData,
            popularData, isLoadingSearch,
            isLoadingDiscover, isErrorSearch,
            isErrorDiscover
        });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const term = debouncedSearch.trim();
        if (term.length > 1) {
            setCurrentSearch(term);
            setPage(1);
            if (Object.keys(filters).length > 0) {
                setFilters({});
            }
        }
    };

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
        setPage(1);
        if (searchTerm.trim().length > 0 || currentSearch.length > 0) {
            setSearchTerm('');
            setCurrentSearch('');
        }
    };

    return (
        <React.Fragment>
            <section style={{marginBottom: '40px'}}>
                <form onSubmit={handleSearch} className="search-box">
                    <input
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search movies..."
                    />
                    <button className="btn" disabled={searchTerm.trim().length < 2}>
                        Search
                    </button>
                </form>
            </section>
            <main className="home-container">
                <DiscoverFilters currentFilters={filters} onFiltersChange={handleFiltersChange}/>
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
                        <Pagination page={page} totalPages={totalPages} onPageChange={setPage}/>
                    )}
                </div>
            </main>
        </React.Fragment>
    );
}

export default Home;
