import styles from "../AddMovie/AddMovie.module.css"
import { useState } from "react";

export const AddMovie = ({
    onCreateMovieSubmit,
}) => { const [values, setValues] = useState({
    title:'',
    year:'',
    genre:'',
    director:'',
    coverUrl:'',
    summary:'',
});

    const onChangeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}))
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onCreateMovieSubmit(values);
    };

    return (
        <section id="addMovieSection">
        <form id="addMovieForm" onSubmit={onSubmit}>
            <div className="container">

                <h3>Add a Movie</h3>
                <label htmlFor="title" className="form-label">Movie Title:</label>
                <input value={values.title} onChange={onChangeHandler} type="addmoviename" name ="title" className="form-control" id="title" aria-describedby="emailHelp" />
            
                <label htmlFor="year" className="form-label">Year:</label>
                <input value={values.year} onChange={onChangeHandler} type="year" name="year" className="form-control" id="year" aria-describedby="emailHelp" />
            
                <label htmlFor="genre" className="form-label">Genre:</label>
                <input value={values.genre} onChange={onChangeHandler} type="genre" name ="genre" className="form-control" id="genre" aria-describedby="emailHelp" />
            
                <label htmlFor="director" className="form-label">Director:</label>
                <input value={values.director} onChange={onChangeHandler} type="director" name="director" className="form-control" id="director" aria-describedby="emailHelp" />
            
                <label htmlFor="coverUrl" className="form-label">Cover URL:</label>
                <input value={values.coverUrl} onChange={onChangeHandler} type="coverUrl" name="coverUrl" className="form-control" id="coverUrl" aria-describedby="emailHelp" />
            
                <label htmlFor="summary">Summary:</label>
                <textarea value={values.summary} onChange={onChangeHandler} name="summary" id="summary"></textarea>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            
        </form>
        </section>
    )
};