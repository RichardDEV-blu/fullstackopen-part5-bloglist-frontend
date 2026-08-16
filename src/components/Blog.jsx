import { useState } from "react"
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
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

        <button>like</button>

        <button onClick={() => setVisible(false)}>
          hide
        </button>
      </div>
    </div>)
}

export default Blog