import { useForm } from "../../../hooks/useForm";
import "./AddComment.css"

export const AddComment = ({
    onCommentSubmit,
    username
}) => {
    
    const { values, changeHandler, onSubmitfunc } = useForm({
        comment: ''
    }, onCommentSubmit);

    return (
        <article className="addcomment">
            <h4>Add your comment:</h4>
                <form className="form" onSubmit={onSubmitfunc} method="POST">
                    <textarea name ="comment" className="form-control" placeholder="Your comment..." value={values.comment} onChange={changeHandler}></textarea>
                    <button className='post-btn' type="submit">Add comment</button>
                </form>                       
        </article>
    )
}