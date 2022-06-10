import Blog from './Blog'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const BlogList = ({ handleLikes, handleRemove, user }) => {
  const blogs = [...useSelector((state) => state.blogs)].sort(
    (a, b) => b.votes - a.votes
  )

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={handleLikes}
          handleRemove={handleRemove}
          user={user}
        />
      ))}
    </div>
  )
}

BlogList.propTypes = {
  handleLikes: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default BlogList
