import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleRemove, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const handleLikeClick = (event) => {
    event.preventDefault()
    handleLikes(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  const handleRemoveClick = (event) => {
    event.preventDefault()
    handleRemove(blog.id)
  }

  const details = () => {
    if (visible)
      return (
        <div>
          {blog.url}<br />
likes {blog.likes}
          <button onClick={handleLikeClick}>like</button> <br />
          {blog.author}<br />
          {(blog.user.id === user.id)
            ? <button onClick={handleRemoveClick}>remove</button>
            : null
          }
        </div>
      )
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      {details()}
    </div>
  )}

export default Blog