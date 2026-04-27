const fs = require('fs');

const content = `import "../CSS/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"

function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites.length > 0) {
        return (
            <div className="favorites">
                <h2>your favorites</h2>
                <div className="movies-grid">
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
`;

fs.writeFileSync('front/src/pages/Favorites.jsx', content);
console.log('File written successfully');

