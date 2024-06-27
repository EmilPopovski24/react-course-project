import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { movieServiceFactory } from "../../services/movieService"
import { commentServiceFactory } from "../../services/commentService"
import { useService} from "../../hooks/useService";
import { useAuthContext } from "../../contexts/AuthContext";
import { AddComment } from './AddComment/AddComment';
import "./Details.css";

export const Details = () => {
    
    const { userId, isAuthenticated } = useAuthContext();
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const movieService = useService(movieServiceFactory);
    const commentService = useService(commentServiceFactory);
    const [comments, setComments] = useState([]);
    const [commment, setComment] = useState('')
    const navigator = useNavigate();

    useEffect(()=> {
        Promise.all([
            movieService.getOneMovie(movieId),
            commentService.getAllComments(movieId)
        ])
            .then(([movieData, comments]) => {
                setMovie({
                    ...movieData, 
                    comments,
                })
            });
    },[movieId, movieService]);

    const onCommentSubmit = async (values) => {        
        const response = await commentService.createComment(movieId, values.comment);
        setMovie(state => ({
            ...state, 
            comments: [...state.comments, response]
        }))  
        setComment('')
    };

    const isOwner = movie._ownerId === userId;

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
        <section>
            <h3 className="details-header">Movie Details</h3> 
         <section className="movie">         
            <img className ="movie-cover" src={movie.coverUrl} alt={movie.title} />
            <div className="info">
                <h1>{movie.title}</h1>
                <h3>Director: {movie.director}</h3>
                <h3>Genre: {movie.genre}</h3>
                <h3>Year: {movie.year}</h3>
                <h3>Summary:</h3>
                <div className="movie-summary">
                    <p id="text">{movie.summary}</p>
                </div>                
            </div>
            </section> 
                <div className="actions">
                    {isOwner && (<div className="editdelete">
                    <Link to={`/catalog/${movie._id}/edit`}  type="button" className="btn-primary">Edit</Link>
                    <button type="button" className="btn-primary" onClick={onDeletefunc}>Delete</button>
                </div>
            )}
                {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}
                </div>                       
            <div className="comments-ul" >                      
                    <h5>Comments:</h5>
                    <ul className='petComments-ul'>  
                    {comments.length > 0 && (comments?.map(x=> (
                        <li key={x._id} className='comment-li'>
                            <p><b>{x.author.username}</b>: {x.comment}</p>  
                            <hr />    
                        </li>
                    )))}
                    {comments.length === 0 && (
                        <h5>No comments</h5>
                    )}
                </ul>

                    {/* {movie.comments && Object.values(movie.comments).map(x => (
                    <li key={x._id} className="comment">
                        <p className="comment-text">{x.username}: {x.comment}</p>
                    </li> ))} */}
            {/* </ul>   */}
            </div>
         </section>      
    )      
}