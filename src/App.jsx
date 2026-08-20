import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const logged = JSON.parse(loggedUserJSON)
      setUser(logged)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      )

      setUser(user)
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (blog) => {
    try {
      const returnedBlog = await blogService.create(blog, user.token)

      setBlogs(currentBlogs =>
        currentBlogs.concat(returnedBlog)
      )

      showNotification(
        `a new blog ${returnedBlog.title} added`,
        'success'
      )
    } catch {
      showNotification('failed to create blog', 'error')
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const likeBlog = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    const returnedBlog = await blogService.update(
      blog.id,
      updatedBlog,
      user.token
    )

    setBlogs(currentBlogs =>
      currentBlogs.map(b =>
        b.id === returnedBlog.id ? returnedBlog : b
      )
    )
  }

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title}?`)) {
      return
    }

    await blogService.remove(blog.id, user.token)

    setBlogs(currentBlogs =>
      currentBlogs.filter(b => b.id !== blog.id)
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification
          message={notification?.message}
          type={notification?.type}
        />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <Notification
        message={notification?.message}
        type={notification?.type}
      />

      <h2>blogs</h2>

      <p>{user.name} logged in</p>

      <button onClick={handleLogout}>Logout</button>

      <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        )}
    </div>
  )
}

export default App