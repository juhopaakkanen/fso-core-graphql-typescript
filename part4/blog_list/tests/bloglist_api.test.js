const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogsAtStart = await helper.blogsInDb()
    expect(blogsAtStart).toHaveLength(helper.initialBlogs.length)
  })

  test('there is property id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    for (const blog of blogsAtStart) {
      expect(blog.id).toBeDefined
    }
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect((blogsAtEnd[helper.initialBlogs.length]).title).toBe(newBlog.title)
  })

  test('data without likes is considered valid', async () => {
    const newBlogNoLikes = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }
    await api
      .post('/api/blogs')
      .send(newBlogNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(((blogsAtEnd)[helper.initialBlogs.length]).likes).toBe(0)
  })

  test('fails with status code 400 if data invalid', async () => {
    const errorBlog = {
      author: 'Robert C. Martin',
      likes: 0,
    }
    await api
      .post('/api/blogs')
      .send(errorBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const title = blogsAtEnd.map(b => b.title)
    expect(title).not.toContain(blogToDelete.title)
  })

  test('failure with status code 400 if id is invalid', async () => {
    await api
      .delete('/api/blogs/123}')
      .expect(400)
  })
})

describe('modyfying a blog', () => {
  test('blog is modified correctly', async () => {
    const modifiedBlog = {
      author: 'Modified Chan',
      likes: 10
    }

    const blogsAtStart = await helper.blogsInDb()
    const blogToModify= blogsAtStart[0]

    console.log(blogToModify)

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(modifiedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const author = blogsAtEnd.map(b => b.author)
    expect(author).toContain(modifiedBlog.author)
  })
})

afterAll(() => {
  mongoose.connection.close()
})