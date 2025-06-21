interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    vote_average: number;
}

interface MovieCardProps {
    movie: Movie;
}

interface MovieDetailsViewProps {
    movie: Movie & {
        tagline?: string;
        runtime?: number;
    };
    setSelectedMovieId: (id: number | null) => void;
}
