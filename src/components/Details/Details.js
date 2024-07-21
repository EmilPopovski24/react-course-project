import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { movieServiceFactory } from "../../services/movieService"
import { commentServiceFactory } from "../../services/commentService"
import { useService} from "../../hooks/useService";
import { useAuthContext } from "../../contexts/AuthContext";
import { AddComment } from './AddComment/AddComment';
import "./Details.css";

export const Details = ({
    deleteMovie
}) => {
    
    const { userId, isAuthenticated } = useAuthContext();
    const { movieId } = useParams();
    const movieService = useService(movieServiceFactory);
    const commentService = useService(commentServiceFactory);
    const [movie, setMovie] = useState({});
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const navigator = useNavigate();

    // useEffect(()=> {
    //     movieService.getOneMovie(movieId)
    //         .then(result => {
    //             setMovie(result)
    //             return commentService.getAllComments(movieId)   
    //         })
    //         .then(result => {
    //             setComments(result)
    //         })
    // }, [movieId]);

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
    },[movieId]);

    const onCommentSubmit = async (values) => {       
        // e.preventDefault(); 
        const response = await commentService.createComment({
            movieId, 
            comment
        });
        setMovie(state => ({
            ...state, 
            comments: [...comments, response]
        }))  
        
        setComment('')
    };

    const isOwner = movie._ownerId === userId;

    // console.log(comments)

    const onDeletefunc = async () => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Are you sure you want to delete ${movie.title} from the list?`)
        if (result) {
            await deleteMovie(movie._id);
        }
        navigator('/catalog');
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
                            <li className="movie-info-li"><b>Director: </b>{movie.director}</li>
                            <li className="movie-info-li"><b>Genre: </b>{movie.genre}</li>
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
            {/* {isAuthenticated && (
                <div className="addComment-div">
                    <form className="addComment-form" onSubmit={onCommentSubmit} method="POST">
                        <textarea name="comment" className='comment-area' id="comment-text" cols="50" rows="3" value={comment} onChange={(e) => setComment(e.target.value) }></textarea>
                        <button className='post-btn' type="submit">Add comment</button>
                    </form>
                </div>
            )} */}
            <div className="comments-ul" >                      
                    {/* <ul className='comments-ul'>  
                    {comments.length > 0 && (comments?.map(x=> (
                        <li key={x._id} className='comment-li'>
                            <p>: {x.comment}</p>  
                            <hr />    
                        </li>
                    )))}
                    {comments.length === 0 && (
                        <h5>No comments</h5>
                    )}
                    </ul> */}
                <ul className="comments-list">
                    {comments && Object.values(comments).map(x => (
                    <li key={x._id} className="comment-li">
                        <p className="comment-text">{x.username}: {x.comment}</p>
                    </li> ))}
                </ul>
            </div>
         </section>      
    )      
}