import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { IHomeState } from "../types/hooks";
import DiscoverFilters from "../components/movie/DiscoverFilters";
import { MovieDisplay } from '../components/movie/display';
import {IDiscoverFilters} from "../types/api";

function Home() {
    const [state, setState] = useState<IHomeState>({
        page: 1,
        searchTerm: '',
        currentSearch: '',
        filters: {}
    });

    const debouncedSearch = useDebounce(state.searchTerm, 700);
    const hasFilters = Object.keys(state.filters).length > 0;

    // Clear filters when search is active
    useEffect(() => {
        if (debouncedSearch.trim().length > 0 && hasFilters) {
            setState(prev => ({ ...prev, filters: {} }));
        }
    }, [debouncedSearch, hasFilters]);

    const updateState = (updates: Partial<IHomeState>) =>
        setState(prev => ({ ...prev, ...updates }));

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const term = debouncedSearch.trim();
        if (term.length > 1) {
            updateState({
                currentSearch: term,
                page: 1,
                ...(hasFilters && { filters: {} })
            });
        }
    };

    const handleFiltersChange = (newFilters: IDiscoverFilters) => {
        const hasSearchActive = state.searchTerm.trim().length > 0 || state.currentSearch.length > 0;
        updateState({
            filters: newFilters,
            page: 1,
            ...(hasSearchActive && { searchTerm: '', currentSearch: '' })
        });
    };

    const handlePageChange = (newPage: number) => updateState({ page: newPage });
    const handleSearchTermChange = (searchTerm: string) => updateState({ searchTerm });

    return (
        <>
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
                <DiscoverFilters
                    currentFilters={state.filters}
                    onFiltersChange={handleFiltersChange}
                />

                <div className="home-grid">
                    <MovieDisplay
                        searchTerm={debouncedSearch}
                        filters={state.filters}
                        page={state.page}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>
        </>
    );
}

export default Home;
