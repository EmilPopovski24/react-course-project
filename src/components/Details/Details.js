import "./Details.module.css";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { movieServiceFactory } from "../../services/movieService"
import * as commmentService from "../../services/commentService"

import { createComment, getAllComments } from "../../services/commentService";
import { useService} from "../../hooks/useService";
import { AuthContext, useAuthContext } from "../../contexts/AuthContext";
// import { useForm } from "../../hooks/useForm";
import { AddComment } from './AddComment/AddComment';

export const Details = () => {
    
    const { userId, isAuthenticated } = useAuthContext();
    
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    // const [username, setUsername] = useState("");
    // const [comment, setComment] = useState("");
    // const [comments, setComments] = useState([]);
    const movieService = useService(movieServiceFactory);

    const navigator = useNavigate();

    useEffect(()=> {
        Promise.all([
            movieService.getOneMovie(movieId),
            commmentService.getAllComments(movieId)
        ])
            .then(([movieData, comments]) => {
                setMovie({
                    ...movieData, 
                    comments,
                })
            });
        // movieService.getOneMovie(movieId)
        //     .then(result => {
        //         setMovie(result); 
        // })
    },[movieId]);


    const onCommentSubmit = async (values) => {        
        const response = await commmentService.createComment(movieId, values.comment);
        console.log(response)
        // console.log(response)
        // console.log(response)
        // console.log(values)
        // const result = await movieService.addComment( movieId,{
        //     username, 
        //     comment, 
        // })
        // setMovie(state => ({...state, comments: {...state.comments, [result._id]: result}}));
        // setUsername("");
        // setComment("");
        // console.log(result)
    };

    const isOwner = movie._ownerId === userId;

    // const onUsernameChange = (e) => {
    //     setUsername(e.target.value)
    // }

    // const onCommentChange = (e) => {
    //     setComment(e.target.value)
    // }

    const onDeletefunc = async () => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Are you sure you want to delete ${movie.title} from the list?`)
        if (result) {
            await movieService.deleteMovie(movie._id);
            navigator('/catalog');
        }
        return
        
    };

    return (
         <section className="styles.movie-details">
            <h3>Movie Details</h3>
            <div id="info">
                <img src={movie.coverUrl} alt={movie.title} />
                <h1>{movie.title}</h1>
                <h2>Director: {movie.director}</h2>
                <h3>Genre: {movie.genre}</h3>
                <h4>Year: {movie.year}</h4>
                <h4>Summary:</h4>
                <div id="summary-div">
                    <p id="text">{movie.summary}</p>
                </div>               
            </div> 
            {isOwner && (<div className="editdelete">
            <Link to={`/catalog/${movie._id}/edit`} style={{background:"green", border:"none", margin:"10px", }} type="button" className="btn btn-primary">Edit</Link>
            <button style={{background:"green", border:"none" }} type="button" className="btn btn-primary" onClick={onDeletefunc}>Delete</button>
            </div>
            )}
            <ul className="comments-ul" >                      
                    {/* {movie.comments.length === 0 ? 
                        <h2>No comments</h2> :  */}
                        <div className="comments">
                            <h4>Comments:</h4>
                            {movie.comments && Object.values(movie.comments).map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.comment}</p>
                            </li> ))}
                        </div>
                        </ul>  
                        {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}
         </section>
    )
}