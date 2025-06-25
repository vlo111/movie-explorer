# Movie Explorer

TMDB API and manage personal movie notes/reviews.



## Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for client-side routing
- **TanStack Query (React Query)** for server state management
- **Custom CSS** with modern design patterns
- **Vite** for build tooling

### Backend
- **Express.js** with TypeScript
- **Axios** for TMDB API integration
- **CORS** enabled for cross-origin requests
- **Morgan** for request logging
- **Custom error handling middleware**

### External APIs
- **The Movie Database (TMDB) API** for movie data

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- TMDB API key (register at https://developers.themoviedb.org/3)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=5000
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
```

5. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Movies
- `GET /api/movies/search?q={query}&page={page}` - Search movies
- `GET /api/movies/popular?page={page}` - Get popular movies
- `GET /api/movies/discover?{filters}&page={page}` - Discover movies with filters
- `GET /api/movies/genres` - Get all movie genres
- `GET /api/movies/{id}` - Get movie details

### Filters for Discovery
- `with_genres` - Filter by genre IDs
- `year` - Filter by release year
- `vote_average_gte` - Minimum rating
- `vote_average_lte` - Maximum rating
- `with_runtime_gte` - Minimum runtime
- `with_runtime_lte` - Maximum runtime
- `sort_by` - Sort criteria

## Technical Decisions

### Architecture Choices
1. **TypeScript across the stack**
2. **Service pattern on backend**
3. **Custom React Query hooks on frontend**


### State Management
1. **React Query for async data**
2. **localStorage for notes**
3. **React Router for client-side navigation**

### Performance
1. **Debounced search input**
2. **Pagination both sides**
3. **Query caching by React Query**

## Future Improvements

- Database integration (ex. PostgreSQL..) for notes storage
- Add movie trailers and videos
- Add advanced search filters (actors, directors)
- Movie recommendations based on user preferences
- Movie watchlists and favorites
- User profiles and social features
- Mobile app development
- Movie discussion forums


## Challenges Faced

1. **TMDB API Integration**: TMDB responses vary in structure → needed clear TS types
2. **Managing client/server state together**
3. **React Query and custom hooks**: Managing the relationship between server state (movies) and client state (notes)
4. **Error Handling**
5. **External API usage**

---
