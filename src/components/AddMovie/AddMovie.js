import styles from "../AddMovie/AddMovie.module.css"

export const AddMovie = () => {
    return (
        <section id="addMovieSection">
        <form id="addMovieForm">
            <div className="container">

                <h3>Add a Movie</h3>
                <label htmlFor="addmoviename" className="form-label">Movie Title:</label>
                <input type="addmoviename" name ="addmoviename" className="form-control" id="addmoviename" aria-describedby="emailHelp" />
            
                <label htmlFor="addyer" className="form-label">Year:</label>
                <input type="addyear" name="addyear" className="form-control" id="addyear" aria-describedby="emailHelp" />
            
                <label htmlFor="addgenre" className="form-label">Genre:</label>
                <input type="addgenre" name ="addgenre" className="form-control" id="addgenre" aria-describedby="emailHelp" />
            
                <label htmlFor="adddirector" className="form-label">Director:</label>
                <input type="adddirector" name="adddirector" className="form-control" id="adddirector" aria-describedby="emailHelp" />
            
                <label htmlFor="addcover" className="form-label">Cover URL:</label>
                <input type="addcover" name="addcover" className="form-control" id="addcover" aria-describedby="emailHelp" />
            
                <label htmlFor="summary">Summary:</label>
                <textarea name="summary" id="summary"></textarea>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            
        </form>
        </section>
    )
};