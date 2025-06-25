import {SearchOptionsType} from "../types";

export const PATHS = {
    ROOT: '/',
    MOVIE: '/movie/:id',
    DISCOVER: '/discover',
    NOTES: '/notes'
};

export const SORT_OPTIONS: SearchOptionsType = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'release_date.desc', label: 'Newest First' },
    { value: 'release_date.asc', label: 'Oldest First' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'vote_average.asc', label: 'Lowest Rated' },
    { value: 'title.asc', label: 'A-Z' },
    { value: 'title.desc', label: 'Z-A' }
];

export const LIMIT_MOVIE = 8

// maximum allowed pages
export const MAX_ALLOWED_PAGES = 800;
