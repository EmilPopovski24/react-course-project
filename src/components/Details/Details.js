import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as movieService from "../../services/movieService"
// import  styles  from "../Details/Details.module.css";
import * as commentService from "../../services/commentService";

export const Details = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(()=> {
        movieService.getOneMovie(movieId)
            .then(result => {
                // console.log(result)
                setMovie(result);
            return commentService.getAllComments(movieId)
            })
            .then(result => {
                setComments(result)
                
            });
    }, [movieId]);

    const onCommentSubmit = async (e) => {
        e.preventDefault();

        await commentService.create({
            username, 
            comment, 
            movieId,
        })

        setUsername("");
        setComment("");
    };

    

    // console.log(comments)
   
 
    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onCommentChange = (e) => {
        setComment(e.target.value)
    }

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
                        <input type="text" name="username" value={username} onChange={onUsernameChange} />
                        <textarea name ="comment" placeholder="Your comment..." value={comment} onChange={onCommentChange}></textarea>
                        <button style={{background:"green", border:"none" }} type="submit" className="btn btn-primary">Publish</button>
                    </form>
                <div className="comments-details">
                    <h4>Comments:</h4>
                    <ul className="comments-ul" >                      
                        {comments.map(x => (
                        <li key={x._id} className="comment">
                            <p>{x.username}: {x.comment}</p>
                        </li>
                        ))}
                    </ul>
                    {comments.length === 0 && (
                        <h2>No comments</h2>
                    )} 
                </div>
                </article>
            </div>
         </section>
    )
}