import { useForm } from "../../../hooks/useForm";
import "./AddComment.css"

export const AddComment = ({
    onCommentSubmit,
    username
}) => {
    
    const { values, changeHandler, onSubmitfunc } = useForm({
        username: {username},
        comment: ''
    }, onCommentSubmit);

    return (
        <article className="addcomment">
            <h4>Add your comment:</h4>
                <form className="form" onSubmit={onSubmitfunc} >
                    <textarea name ="comment" className="form-control" placeholder="Your comment..." values={values.comment} onChange={changeHandler}></textarea>
                    <button className='post-btn' type="submit">Add comment</button>
                </form>                       
        </article>
    )
}