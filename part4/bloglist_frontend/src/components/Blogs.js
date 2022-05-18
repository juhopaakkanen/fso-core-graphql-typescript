import Blog from  './Blog'

const Blogs = ({ blogs, handleLikes }) => (
  <div>
    <h2>Blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} handleLikes={handleLikes} />
    )}
  </div>
)

export default Blogs