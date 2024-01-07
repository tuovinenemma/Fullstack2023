const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})
// ...

const api = supertest(app)
  
test('the identifier is id', async () => {  
    const response = await api.get('/api/blogs') 
    response.body.forEach(blog => {  
      expect(blog.id).toBeDefined()  
    })
})

test('a blog can be added successfully', async () => {
    const newBlog = {
      title: 'Lahnan seikkailut Intiassa',
      author: 'Kalle Kivi',
      url: 'www.kalleonkivi.com',
      likes: 303
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
})

test('if likes not given answer should be zero', async () => {
    const newBlog = {
      title: 'Ukkonen',
      author: 'Sade',
      url: 'www.jyrinaajamurinaa.com'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes[helper.initialBlogs.length]).toBe(0)
  
})

test('empty field given', async () => {
    const newBlog = {
        title: 'Miau',
        author: 'Kissa',
        likes: 56
      }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)


  
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  
})

describe('deletion of a blog', () => {
    test('delete blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)

    })
 })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})