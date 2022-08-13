import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((b) => b.id === parseInt(id))

  const handleLikeClick = () => {
    try {
      dispatch(
        likeBlog(blog.id, {
          ...blog,
          user: blog.user.id,
          likes: blog.likes + 1
        })
      )
      dispatch(setNotification(`Liked ${blog.title}`))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }

  const handleRemoveClick = () => {
    try {
      if (window.confirm(`Delete ${blog.title} ${blog.author}?`)) {
        dispatch(removeBlog(blog.id, user.token))
        dispatch(setNotification(`Removed ${blog.title} ${blog.author}`))
      }
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes
      <button onClick={handleLikeClick}>like</button> <br />
      added by {blog.user.name}
      <br />
      {blog.user.id === user.id ? (
        <button onClick={handleRemoveClick}>remove</button>
      ) : null}
      <h3>comments</h3>
      <CommentForm />
      <ul>
        {blog.comments?.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
