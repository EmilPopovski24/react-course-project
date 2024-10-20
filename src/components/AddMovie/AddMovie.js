import { useForm } from "../../hooks/useForm";
import "./AddMovie.css";

export const AddMovie = ({
    onCreateMovieSubmit,
}) => { 
    
    const {values, changeHandler, onSubmitfunc } = useForm({
        title:'',
        year:'',
        genre:'',
        director:'',
        coverUrl:'',
        summary:'',
}, onCreateMovieSubmit);

    return (
        <section id="addMovieSection">
        <form id="addMovieForm" onSubmit={onSubmitfunc} method="POST" >
            <div className="container">

                <h3 className="addmovie-header">Add a Movie</h3>

                <label htmlFor="title" className="form-label">Movie Title:</label>
                <input value={values.title} onChange={changeHandler} type="addmoviename" name ="title" className="form-control" id="title" aria-describedby="emailHelp" required/>
            
                <label htmlFor="year" className="form-label">Year:</label>
                <input value={values.year} onChange={changeHandler} type="year" name="year" className="form-control" id="year" aria-describedby="emailHelp" required/>
            
                <label htmlFor="genre" className="form-label">Genre:</label>
                <input value={values.genre} onChange={changeHandler} type="genre" name ="genre" className="form-control" id="genre" aria-describedby="emailHelp" required/>
            
                <label htmlFor="director" className="form-label">Director:</label>
                <input value={values.director} onChange={changeHandler} type="director" name="director" className="form-control" id="director" aria-describedby="emailHelp" required/>
            
                <label htmlFor="coverUrl" className="form-label">Cover URL:</label>
                <input value={values.coverUrl} onChange={changeHandler} type="coverUrl" name="coverUrl" className="form-control" id="coverUrl" aria-describedby="emailHelp" required/>
            
                <label htmlFor="summary">Summary:</label>
                <textarea value={values.summary} onChange={changeHandler} className="summary" name="summary" id="summary" required></textarea>
                
                <button type="submit" className="btn-primary">Submit</button>
                
            </div>
        </form>
        </section>
    )
};