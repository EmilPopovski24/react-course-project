import { Link } from "react-router-dom";

export const CatalogItem = ({
    title,
    coverUrl,
    year,
    genre,
    director,
}) => {
    return(
        <div className="allMovies">
                <div className="card" style={{width: "18rem"}}>
                    <img src={coverUrl} className="card-img-top" alt={title} /> 
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{director}</p>
                    <p className="card-text">{genre}</p>
                    <p className="card-text">{year}</p>
                    <Link to="#" className="details-button">Details</Link>
                </div>
            </div>
        </div> 
    )
}