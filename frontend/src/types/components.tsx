import {IDiscoverFilters, IMovie, INote, INoteCreate, INoteUpdate} from "./api";

export interface IPaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
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

export interface IMovieListProps {
    page: number;
    onPageChange: (page: number) => void;
}

export interface ISearchMoviesProps extends IMovieListProps {
    searchTerm: string;
}

export interface IDiscoverMoviesProps extends IMovieListProps {
    filters: IDiscoverFilters;
}

export interface IMovieDisplayProps {
    searchTerm: string;
    filters: IDiscoverFilters;
    page: number;
    onPageChange: (page: number) => void;
}
