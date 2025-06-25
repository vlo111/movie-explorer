import {LIMIT_MOVIE, MAX_ALLOWED_PAGES} from "./constants.ts";

export const fallbackError = (context: string | undefined): string => `Unable to load ${context}.`;

/**
 * Transforms movie API response data with consistent limits and pagination caps
 *
 * @param data - Raw API response data from TMDB
 * @returns Transformed data with limited results and capped pagination
 */
export const selectResponseData = (data) => ({
        ...data,
        results: data.results.slice(0, LIMIT_MOVIE),           // Limit results per page
        total_pages: Math.min(data.total_pages, MAX_ALLOWED_PAGES),    // Cap to 800 pages max
        total_results: Math.min(data.total_results, MAX_ALLOWED_PAGES * LIMIT_MOVIE)  // Adjust total count
})
