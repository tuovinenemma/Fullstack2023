const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (body.title === undefined) {
    return response.status(400).json({ error: "Missing title" })
  } else if (body.url === undefined) {
    return response.status(400).json({ error: "Missing url" })}

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

    const savedblog = await blog.save({})
    response.status(201).json(savedblog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
  response.status(200).json(updatedBlog)
})




module.exports = blogsRouter