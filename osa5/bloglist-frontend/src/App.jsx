import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(() => {
        blogService.getAll().then(initialBlogs => {
          setBlogs(initialBlogs)
        })
        setNotification(`Added ${blogObject.title} by ${blogObject.author}!`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage('title or url missing')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }



  const addLike = id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    blogService
      .update(id, changedBlog)
      .then(() => {
        blogService.getAll().then(initialBlogs => {
          setBlogs(initialBlogs)
        })
      })
  }

  const deleteBlog = id => {
    const blog = blogs.find(b => b.id === id)

    if (window.confirm(`Do you want to delete blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(ogBlogs => ogBlogs.filter(({ id }) => id !== blog.id))
          setNotification(`blog ${blog.title} deleted`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login to application</h2>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div><p></p>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div><p></p>
      <button id="login-button" type="submit">          
        login
      </button>
    </form>
  )



  return (
    <div>
      <Error message={errorMessage} />
      <Notification message={notification} />
      
      {user === null ?
        loginForm() :
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in</p>
          <form onSubmit={handleLogOut}>
            <button type="submit">logout</button><p></p>
          </form>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id}
              blog={blog}
              addLike={() => addLike(blog.id)}
              deleteBlog={() => deleteBlog(blog.id)}
              user={user}
            />
          )}

        </div>
      }
    </div>
  )
}

export default App