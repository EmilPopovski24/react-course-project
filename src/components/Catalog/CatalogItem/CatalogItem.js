import "./CatalogItem.css"
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";

export const CatalogItem = ({
    title,
    coverUrl,
    year,
    genre,
    director,
    _id
}) => {
    const { isAuthenticated } = useContext(AuthContext);

    return(
        <div className="allMovies">
                <div className="card" style={{width: "18rem"}}>
                    <img src={coverUrl} className="card-img-top" alt={title} /> 
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">Director:{director}</p>
                    <p className="card-text">Genre: {genre}</p>
                    <p className="card-text">{year}</p>
                    {isAuthenticated && (<Link to={`/catalog/${_id}`} className="details-button">Details</Link>)}
                </div>
            </div>
        </div> 
    )
}