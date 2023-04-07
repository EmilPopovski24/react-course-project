import "./Catalog.css";
import { CatalogItem } from "./CatalogItem/CatalogItem";

export const Catalog = ({
    movies,
}) => {
    return(
        <section id="catalog">
            {movies.length === 0 ?
                <h2>No Movies For Review</h2>
            :   <h2>Currently Reviewed Movies</h2>}

            {movies.map(x => <CatalogItem key={x._id} {...x} />)}         
        </section>
    );
}