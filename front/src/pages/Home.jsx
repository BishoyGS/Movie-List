import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard"
import "../CSS/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);

    const loadPopularMovies = async () => {
        try {
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
            setError(null);
        } catch (err) {
            console.log(err)
            setError("Failed to load movies.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadPopularMovies()
    }, []);

    useEffect(() => {
        const resetSearch = () => {
            setSearchQuery("")
            setError(null)
            setSearching(false)
            setLoading(true)
            loadPopularMovies()
        }

        window.addEventListener("homeResetSearch", resetSearch)
        return () => window.removeEventListener("homeResetSearch", resetSearch)
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery.trim())
        }, 300)

        return () => clearTimeout(handler)
    }, [searchQuery])

    useEffect(() => {
        if (debouncedQuery === "") {
            loadPopularMovies()
            return
        }

        const runSearch = async () => {
            setSearching(true)
            setError(null)
            try {
                const searchResults = await searchMovies(debouncedQuery)
                setMovies(searchResults)
                if (searchResults.length === 0) {
                    setError("No movies found for that search.")
                }
            } catch (err) {
                console.log(err)
                setError("Failed to search movies.")
            } finally {
                setSearching(false)
            }
        }

        runSearch()
    }, [debouncedQuery])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return

        setDebouncedQuery(searchQuery.trim())
    }

    const isBusy = loading || searching

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* <button type="submit" className="search-button" disabled={searching}>
                    {searching ? "Searching..." : "Search"}
                </button> */}
            </form>

            {error && <div className="error-message">{error}</div>}

            {isBusy ? (
                <div className="loading">{searching ? "Searching..." : "Loading..."}</div>
            ) : movies.length > 0 ? (
                <div className="movies-grid">
                    {movies.map(movie => <MovieCard movie={movie} key={movie.id} />)}
                </div>
            ) : (
                <div className="empty-state">No movies available right now.</div>
            )}

        </div>
    )
}

export default Home