import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const BlogForm = () => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    try {
      dispatch(
        createBlog({
          title: title.value,
          author: author,
          url: url,
          likes: 0
        })
      )
      dispatch(setNotification(`a new blog ${title.value} by ${author} added`))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title <input id="title-input" {...title} />
        </div>
        <div>
          author <input id="author-input" {...author} />
        </div>
        <div>
          url <input id="url-input" {...url} />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
