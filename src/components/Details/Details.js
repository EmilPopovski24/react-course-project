import "./Details.module.css";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { movieServiceFactory } from "../../services/movieService"

import { commentServiceFactory } from "../../services/commentService";
import { useService} from "../../hooks/useService";
import { AuthContext } from "../../contexts/AuthContext";

export const Details = () => {
    const { userId } = useContext(AuthContext);
    const { movieId } = useParams();
    // console.log(movieId)
    const [movie, setMovie] = useState({});
    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const movieService = useService(movieServiceFactory);
    // console.log(movieService)
    const commentService = useService(commentServiceFactory);
    // console.log(commentService);
    const navigator = useNavigate();

    useEffect(()=> {
        movieService.getOneMovie(movieId)
            .then(result => {
                setMovie(result); 
                return commentService.getAllComments(movieId)
        })
        .then(result =>{
            setComments(result)
        });
    },[movieId]);


    const onCommentSubmit = async (e) => {
        e.preventDefault();

        const result = await commentService.createComment( {
            movieId,
            username, 
            comment, 

        })
        setMovie(state => ({...state, comments: {...state.comments, [result._id]: result}}));
        setUsername("");
        setComment("");
        
    };

    const isOwner = movie._ownerId === userId;

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onCommentChange = (e) => {
        setComment(e.target.value)
    }

    const onDeletefunc = async () => {
        await movieService.deleteMovie(movie._id);
        navigator('/catalog');
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
                <article className="create-comment">
                    <h4>Add your comment:</h4>
                    <form className="form-comment" onSubmit={onCommentSubmit}>
                        <input type="text" name="username" placeholder="Your name..." value={username} onChange={onUsernameChange} />
                        <textarea name ="comment" placeholder="Your comment..." value={comment} onChange={onCommentChange}></textarea>
                        <button style={{background:"green", border:"none" }} type="submit" className="btn btn-primary">Publish</button>
                    </form>                  
                    <ul className="comments-ul" >                      
                    {comments.length === 0 ? 
                        <h2>No comments</h2> :
                        <div className="comments">
                            <h4>Comments:</h4>
                            {comments.map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.username}: {x.comment}</p>
                            </li> ))}
                        </div>
                        }
                        </ul>  
                </article>
            </div>
            {isOwner && (<div className="editdelete">
            <Link to={`/catalog/${movieId}/edit`} style={{background:"green", border:"none", margin:"10px", }} type="button" className="btn btn-primary">Edit</Link>
            <button style={{background:"green", border:"none" }} type="button" className="btn btn-primary" onClick={onDeletefunc}>Delete</button>
            </div>
            )}
         </section>
    )
}