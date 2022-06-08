const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')


describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('rootpassword', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testuser',
      name: 'Tim Tester',
      password: 'testpassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'adminpass',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testuser2',
      name: 'Test user 2',
      password: 'aa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be min. 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tu',
      name: 'Test user',
      password: 'aaa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum allowed length (3).')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('when there is initially two blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
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
    const user =  {
      username: 'root',
      password: 'rootpassword'
    }
    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = result.body.token

    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect((blogsAtEnd[helper.initialBlogs.length]).title).toBe(newBlog.title)
  })

  test('fails with status code 401 Unauthorized if there is no token', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('data without likes is considered valid', async () => {
    const user =  {
      username: 'root',
      password: 'rootpassword'
    }
    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = result.body.token

    const newBlogNoLikes = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 2)
    expect(((blogsAtEnd)[helper.initialBlogs.length + 1]).likes).toBe(0)
  })

  test('fails with status code 400 if data invalid', async () => {
    const user =  {
      username: 'root',
      password: 'rootpassword'
    }
    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = result.body.token

    const errorBlog = {
      author: 'Robert C. Martin',
      likes: 0,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(errorBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 2)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const user =  {
      username: 'root',
      password: 'rootpassword'
    }
    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = result.body.token

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[helper.initialBlogs.length + 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(b => b.title)
    expect(title).not.toContain(blogToDelete.title)
  })

  test('failure with status code 400 if id is invalid', async () => {
    const user =  {
      username: 'root',
      password: 'rootpassword'
    }
    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = result.body.token

    await api
      .delete('/api/blogs/123}')
      .expect(400)
      .set('Authorization', `Bearer ${token}`)
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