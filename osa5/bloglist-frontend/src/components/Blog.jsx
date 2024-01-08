import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [state, changeState] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showAll = () => (
    <div>
      {blog.url}<p></p>
      likes {blog.likes}<button onClick={addLike}>like</button>
      {blog.user.username}
      {user.username === blog.user.username && (<button onClick={deleteBlog}>delete</button>)}
    </div>
  )

  const changeStatus = () => {
    if (state === true) {
      changeState(false)
    } else if (state === false) {
      changeState(true)
    }
  }

  const label = state
    ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={changeStatus}>{label}</button>
      {state === true ? showAll() : null}
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog