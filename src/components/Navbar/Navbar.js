import "./Navbar.css"
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export const Navbar = () => {
    
    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return( 
        <div>  
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                {!isAuthenticated && (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/catalog">Catalog</Link>
                    </li>
                </ul>
                )}
                {isAuthenticated && (
                    <div id="logged-user">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item username">
                                <h6>Hello, {userEmail.split('@')[0]}</h6>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/account">My Account</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/catalog">Catalog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/addmovie">Add Movie</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>  
                )}  
        </div>
  </div>
</nav>
</div>
);
}