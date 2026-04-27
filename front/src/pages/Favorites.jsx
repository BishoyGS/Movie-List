import "../CSS/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"

function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites.length > 0) {
        const gridClass = favorites.length === 1 ? "movies-grid single-grid" : "movies-grid"

        return (
            <div className="favorites">
                <h2>your favorites</h2>
                <div className={gridClass}>
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="favorites-empty">
            <h2>no favorite movies yet</h2>
            <p>add movies to favorites so you can see them here</p>
        </div>
    );
}

export default Favorites
