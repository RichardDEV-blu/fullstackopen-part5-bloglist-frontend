import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
    const user = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedBlogappUser',
      JSON.stringify(user)
    )
    setUser(user)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)


  }

  const createBlog = async (blog) => {
    const returnedBlog = await blogService.create(blog, user.token)
    setBlogs(blogs.concat(returnedBlog))
  }

  if (user === null) {
    return (<LoginForm handleLogin={handleLogin} />)

  }



  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <BlogForm createBlog={createBlog} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App