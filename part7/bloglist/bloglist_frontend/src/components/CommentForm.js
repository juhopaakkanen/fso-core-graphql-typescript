import { useField } from '../hooks'
import { createComment } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const CommentForm = () => {
  const { reset: resetComment, ...comment } = useField('text')
  const id = useParams().id
  const dispatch = useDispatch()

  const addComment = (event) => {
    event.preventDefault()
    dispatch(createComment(id, comment.value))
    resetComment()
  }

  return (
    <div>
      <form onSubmit={addComment}>
        <div>
          <input id="comment-input" {...comment} />
          <button id="create-comment" type="submit">
            add comment
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
