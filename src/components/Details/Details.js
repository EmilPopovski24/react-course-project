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
    const [comment, setComment] = useState('')
    const navigator = useNavigate();

    useEffect(()=> {
        movieService.getOneMovie(movieId)
            .then(result => {
                setMovie(result)
                return commentService.getAllComments(movieId)   
            })
            .then(result => {
                setComments(result)
            })
    }, [movieId]);

    // useEffect(()=> {
    //     Promise.all([
    //         movieService.getOneMovie(movieId),
    //          commentService.getAllComments(movieId)
    //     ])
    //         .then(([movieData, comments]) => {
    //             setMovie({
    //                 ...movieData, 
    //                 comments,
    //             })
    //         });
    // },[movieId, movieService]);

    const onCommentSubmit = async (values) => {       
        // e.preventDefault(); 
        const response = await commentService.createComment({
            movieId, comment
        });
        setMovie(state => ({
            ...state, 
            comments: [...comments, response]
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
        <section className="main">
            <section className="movie-section">   
                <div>
                    <img className="movie-img" src={movie.coverUrl} alt={movie.title} />
                </div>      
                <div className="info">
                    <div className="movie-title">
                        <h4>{movie.title} ({movie.year})</h4>
                    </div>
                    <div className="movie-info">
                        <ul className="movie-info-ul">
                            <li className="movie-info-li">Director: {movie.director}</li>
                            <li className="movie-info-li">Genre: {movie.genre}</li>
                            <li className="movie-info-summary"><p id="text">{movie.summary}</p></li>
                        </ul>
                    </div>
                    <div className="actions">
                    {isOwner && (<div className="editdelete">
                    <Link to={`/catalog/${movie._id}/edit`}  type="button" className="btn-primary">Edit</Link>
                    <button type="button" className="btn-primary" onClick={onDeletefunc}>Delete</button>
                </div>  
            )}</div> 
            </div>
            </section>        
            {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}               
            <div className="comments-ul" >                      
                    <ul className='comments-ul'>  
                    {comments.length > 0 && (comments?.map(x=> (
                        <li key={x._id} className='comment-li'>
                            <p><b>{x.author}</b>: {x.comment}</p>  
                            <hr />    
                        </li>
                    )))}
                    {comments.length === 0 && (
                        <h5>No comments</h5>
                    )}
                </ul>
                <ul>
                    {movie.comments && Object.values(movie.comments).map(x => (
                    <li key={x._id} className="comment">
                        <p className="comment-text">{x.username}: {x.comment}</p>
                    </li> ))}
                </ul>
            </div>
         </section>      
    )      
}