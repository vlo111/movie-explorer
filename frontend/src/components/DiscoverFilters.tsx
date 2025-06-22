import {useGenres} from "../api/use-movie-genres.ts";
import {IDiscoverFilters} from "../types/api.ts";
import {SORT_OPTIONS} from "../helpers/constants.ts";

function DiscoverFilters({ onFiltersChange, currentFilters }: IDiscoverFilters) {
    const { genres } = useGenres();

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...currentFilters };
        if (value === '') {
            delete newFilters[key];
        } else {
            newFilters[key] = value;
        }
        onFiltersChange(newFilters);
    };

    const clearFilters = () => {
        onFiltersChange({});
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    return (
        <div style={{ marginBottom: '30px' }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '20px',
                    borderRadius: '15px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px',
                        marginBottom: '20px'
                    }}>
                        <div>
                            <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>
                                Genre
                            </label>
                            <select
                                value={currentFilters.with_genres || ''}
                                onChange={(e) => handleFilterChange('with_genres', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    color: 'white'
                                }}
                            >
                                <option value="">All Genres</option>
                                {genres.map((genre: any) => (
                                    <option key={genre.id} value={genre.id} style={{ color: 'black' }}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>
                                Release Year
                            </label>
                            <select
                                value={currentFilters.year || ''}
                                onChange={(e) => handleFilterChange('year', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    color: 'white'
                                }}
                            >
                                <option value="">Any Year</option>
                                {years.map(year => (
                                    <option key={year} value={year} style={{ color: 'black' }}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>
                                Min Rating
                            </label>
                            <select
                                value={currentFilters.vote_average_gte || ''}
                                onChange={(e) => handleFilterChange('vote_average_gte', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    color: 'white'
                                }}
                            >
                                <option value="">Any Rating</option>
                                <option value="8" style={{ color: 'black' }}>8+ Stars</option>
                                <option value="7" style={{ color: 'black' }}>7+ Stars</option>
                                <option value="6" style={{ color: 'black' }}>6+ Stars</option>
                                <option value="5" style={{ color: 'black' }}>5+ Stars</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>
                                Sort By
                            </label>
                            <select
                                value={currentFilters.sort_by || 'popularity.desc'}
                                onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    color: 'white'
                                }}
                            >
                                {SORT_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value} style={{ color: 'black' }}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexDirection: "column" }}>
                        <button
                            className="btn"
                            onClick={clearFilters}
                            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                        >
                            Clear All Filters
                        </button>
                        <span style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '0.9rem',
                            alignSelf: 'center'
                        }}>
                            {Object.keys(currentFilters).length} filter active
                        </span>
                    </div>
                </div>
        </div>
    );
}

export default DiscoverFilters;
