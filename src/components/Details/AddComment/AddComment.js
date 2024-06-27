import "./AddComment.css"
import { useForm } from "../../../hooks/useForm"

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
                    <textarea name ="comment" className="comment-area" placeholder="Your comment..." value={values.comment} onChange={changeHandler}></textarea>
                    <input className ="submit-btn"  type="submit" value="Publish" />
                </form>                       
        </article>
    )
}
