import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogsView = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogsView
