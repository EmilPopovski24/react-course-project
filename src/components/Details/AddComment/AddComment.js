import { useForm } from "../../../hooks/useForm"

export const AddComment = ({
    onCommentSubmit,
}) => {
    const { values, changeHandler, onSubmitfunc } = useForm({
        comment: ''
    }, onCommentSubmit);

    return (
        <article className="addcomment">
            <h4>Add your comment:</h4>
                <form className="form" onSubmit={onSubmitfunc} >
                    <textarea name ="comment" placeholder="Your comment..." value={values.comment} onChange={changeHandler}></textarea>
                    <input className ="submit btn" style={{background:"green", border:"none", color:"white" }} type="submit" value="Publish" />
                </form>                       
        </article>
    )
}