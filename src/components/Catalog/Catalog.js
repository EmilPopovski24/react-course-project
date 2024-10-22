import "./Catalog.css";
import { CatalogItem } from "./CatalogItem/CatalogItem";

export const Catalog = ({
    movies,
}) => {

    return(
        <>
        <section className="catalog">
            {movies.length === 0 ?
                <h2 className="catalog-header">No Movies For Review</h2>
            :   <h2 className="catalog-header">Currently Reviewed Movies</h2>}
            <div className="movies-list">
            {movies.map(x => <CatalogItem key={x._id} {...x} />)}      
            </div>   
        </section>
        </>
    );
}