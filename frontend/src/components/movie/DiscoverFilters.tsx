import React, { useCallback, useMemo } from "react";
import { useGenres } from "../../api/movies/use-movie-genres.ts";
import { SORT_OPTIONS } from "../../helpers/constants.ts";
import {IDiscoverFiltersProps} from "../../types";
import {IGenre} from "../../types/api";

const DiscoverFilters: React.FC<IDiscoverFiltersProps> = ({ onFiltersChange, currentFilters }) => {
    const { genres } = useGenres();

    const handleFilterChange = useCallback((key: string, value: string) => {
        const newFilters = { ...currentFilters };
        value === '' ? delete newFilters[key] : (newFilters[key] = value);
        onFiltersChange(newFilters);
    }, [currentFilters, onFiltersChange]);

    const clearFilters = useCallback(() => {
        onFiltersChange({});
    }, [onFiltersChange]);

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 50 }, (_, i) => currentYear - i);
    }, []);

    const filterFields = [
        {
            label: "Genre",
            value: currentFilters.with_genres || '',
            onChange: (v: string) => handleFilterChange("with_genres", v),
            options: [{ value: "", label: "All Genres" }, ...genres.map((g: IGenre) => ({ value: g.id, label: g.name }))]
        },
        {
            label: "Release Year",
            value: currentFilters.year || '',
            onChange: (v: string) => handleFilterChange("year", v),
            options: [{ value: "", label: "Any Year" }, ...years.map(y => ({ value: y, label: y }))]
        },
        {
            label: "Min Rating",
            value: currentFilters.vote_average_gte || '',
            onChange: (v: string) => handleFilterChange("vote_average_gte", v),
            options: [
                { value: "", label: "Any Rating" },
                { value: "8", label: "8+ Stars" },
                { value: "7", label: "7+ Stars" },
                { value: "6", label: "6+ Stars" },
                { value: "5", label: "5+ Stars" },
            ]
        },
        {
            label: "Sort By",
            value: currentFilters.sort_by || 'popularity.desc',
            onChange: (v: string) => handleFilterChange("sort_by", v),
            options: SORT_OPTIONS
        }
    ];

    return (
        <div className="filter-container">
            <div className="filter-box">
                <div className="filter-grid">
                    {filterFields.map(({ label, value, onChange, options }) => (
                        <div key={label}>
                            <label className="filter-label">{label}</label>
                            <select
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                className="filter-select"
                            >
                                {options.map(({ value, label }) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                <div className="filter-controls">
                    <button className="btn btn-clear" onClick={clearFilters}>
                        Clear All Filters
                    </button>
                    <span className="filter-info">
                        {Object.keys(currentFilters).length} filter
                        {Object.keys(currentFilters).length !== 1 ? "s" : ""} active
                    </span>
                </div>
            </div>
        </div>
    );
}

export default DiscoverFilters;
