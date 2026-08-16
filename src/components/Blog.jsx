import { useState } from "react"
const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 2,
  marginBottom: 5
}

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>

      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>
          view
        </button>
      </div>

      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>{blog.likes} likes</div>
        <div>{blog.user.name}</div>

        <button onClick={() => likeBlog(blog)}>
          like
        </button>

        {blog.user.id === user.id && (
          <button onClick={() => deleteBlog(blog)}>
            remove
          </button>
        )}

        <button onClick={() => setVisible(false)}>
          hide
        </button>
      </div>
    </div>)
}

export default Blog