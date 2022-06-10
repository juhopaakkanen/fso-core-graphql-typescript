import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const handleLikeClick = () => {
    try {
      dispatch(likeBlog(blog.id, { ...blog, user: blog.user.id }))
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

  const details = () => {
    if (visible)
      return (
        <div>
          {blog.url}
          <br />
          likes {blog.likes}
          <button onClick={handleLikeClick}>like</button> <br />
          {blog.author}
          <br />
          {blog.user.id === user.id ? (
            <button onClick={handleRemoveClick}>remove</button>
          ) : null}
        </div>
      )
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      {details()}
    </div>
  )
}

export default Blog
