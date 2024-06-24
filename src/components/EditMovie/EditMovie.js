import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { useService } from "../../hooks/useService";
import { movieServiceFactory } from "../../services/movieService";

export const EditMovie = ({
    onEditMovieSubmit
}) => {
    
        const { movieId } = useParams();
        const movieService = useService(movieServiceFactory);
        const {  changeValues, values, changeHandler, onSubmitfunc } = useForm({
            _id: '',
            title:'',
            year:'',
            genre:'',
            director:'',
            coverUrl:'',
            summary:'',
        }, onEditMovieSubmit);
    
        useEffect(() => {
            movieService.getOneMovie(movieId)
                .then(result => {
                    changeValues(result);
                    console.log(result)
                });
        }, [changeValues, movieId, movieService]);
    
    return (
        <section id="editMovieSection">
        <form id="editMovieForm" onSubmit={onSubmitfunc} >
            <div className="container">

                <h3>Edit Movie Details</h3>

                <label htmlFor="title" className="form-label">Movie Title:</label>
                <input value={values.title} onChange={changeHandler} type="addmoviename" name ="title" className="form-control" id="title" aria-describedby="emailHelp" />
            
                <label htmlFor="year" className="form-label">Year:</label>
                <input value={values.year} onChange={changeHandler} type="year" name="year" className="form-control" id="year" aria-describedby="emailHelp" />
            
                <label htmlFor="genre" className="form-label">Genre:</label>
                <input value={values.genre} onChange={changeHandler} type="genre" name ="genre" className="form-control" id="genre" aria-describedby="emailHelp" />
            
                <label htmlFor="director" className="form-label">Director:</label>
                <input value={values.director} onChange={changeHandler} type="director" name="director" className="form-control" id="director" aria-describedby="emailHelp" />
            
                <label htmlFor="coverUrl" className="form-label">Cover URL:</label>
                <input value={values.coverUrl} onChange={changeHandler} type="coverUrl" name="coverUrl" className="form-control" id="coverUrl" aria-describedby="emailHelp" />
            
                <label htmlFor="summary">Summary:</label>
                <textarea value={values.summary} onChange={changeHandler} name="summary" id="summary"></textarea>
                
                <button type="submit" className="btn btn-primary">Confirm changes</button>
            </div>
            
        </form>
        </section>
    )
    
}