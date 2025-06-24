import {IDiscoverFilters, IMovie, INote, INoteCreate, INoteUpdate, ISortOption} from "./api";

export interface IRouteParams {
    id?: string;
}

export type SearchOptionsType = Array<ISortOption>

export interface IPaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface IPaginatedResponse<IMovie> {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export interface INoteFormProps {
    note?: INote | null;
    movieId?: number;
    movieTitle?: string;
    moviePoster?: string | null;
    onSubmit: (data: INoteCreate | INoteUpdate) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export interface INoteCardProps {
    note: INote;
    onDelete: (id: number) => void;
}

export interface INoteSectionProps {
    movie: IMovie;
}

export interface IMovieCardProps {
    movie: IMovie;
}

export interface IMovieDetailsViewProps {
    movie: IMovie;
    setSelectedMovieId: (id: number | null) => void | (() => void);
}

export interface IDiscoverFiltersProps {
    onFiltersChange: (filters: IDiscoverFilters) => void;
    currentFilters: IDiscoverFilters;
}
