import { styles } from "../Catalog/Catalog.module.css"
 
export const Catalog = () => {
    return(
        <section id="catalog">
            <div>
                <h2>Currently Reviewed Movies</h2>
            </div>
            <div id="list">
                <ul className="list-group">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                </ul> 
            </div> 
        </section>
    );
}