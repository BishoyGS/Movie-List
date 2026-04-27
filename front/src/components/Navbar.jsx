import { Link, useLocation } from "react-router-dom"
import "../CSS/navbar.css"

function Navbar(){
    const location = useLocation()

    const handleHomeClick = () => {
        if (location.pathname === "/") {
            window.dispatchEvent(new CustomEvent("homeResetSearch"))
        }
    }

    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movie-List</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link" onClick={handleHomeClick}>Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>

        </nav>
    )
}

export default Navbar