import Blog from  './Blog'
import PropTypes, { object } from 'prop-types'

const Blogs = ({ blogs, handleLikes, handleRemove, user }) => (
  <div>
    <h2>Blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id}
        blog={blog}
        handleLikes={handleLikes}
        handleRemove={handleRemove}
        user={user}
      />
    )}
  </div>
)

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(object).isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blogs