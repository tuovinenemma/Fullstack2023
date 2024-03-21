import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')

  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
      title:
        <input
          id='title'
          value={title}
          onChange={handleTitleChange}
          placeholder='title'
        />
        <br></br>
        <p></p>
      author:
        <input
          id='author'
          value={author}
          onChange={handleAuthorChange}
          placeholder='author'
        />
        <br></br>
        <p></p>
      url:
        <input
          id='url'
          value={url}
          onChange={handleUrlChange}
          placeholder='url'
        />
        <br></br>
        <p></p>

        <button type="submit">save new blog</button><p></p>

      </form>
    </div>
  )
}

export default BlogForm