import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showDetails = () => {
    if (visible)
      return (
        <div>
          {blog.url}<br />
likes {blog.likes}
          <button onClick={() => console.log('click')}>likes</button> <br />
          {blog.author}<br />
        </div>
      )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      {showDetails()}
    </div>
  )}

export default Blog