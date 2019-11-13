const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    	{
        	"title": "katti matikaisen happotekno blogi",
        	"author": "Katti Matikainen",
        	"url": "katti.com",
        	"likes": 84,
        	"id": "5dca77bcb3c16e0b44ec2594"
    	},
    	{
        	"title": "athene pöhinä blogi",
        	"author": "Katri niemi",
        	"url": "katri.com",
        	"likes": 600,
        	"id": "5dca8e1e96dde92cb8ce3337"
    	},
    	{
        	"title": "tomin äiä blogi",
        	"author": "Tomi bjorck",
        	"url": "tomi.com",
        	"likes": 6,
        	"id": "5dca9eedc856ff5f1414c59a"
    	}
	]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

test('(right number of) blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    //.expect(200)
    //.expect('Content-Type', /application\/json/)

  const contents = response.body//.map(r => r.name)

  expect(response.header['content-type']).toContain('application/json')

  expect(response.status).toEqual(200)
  expect(contents.length).toBe(3)
})

test('id is defined as id', async () => {
	const res = await api.get('/api/blogs')

	res.body.forEach(x => expect(x.id).toBeDefined)
})

test('blogs can be added via POST method', async () => {
	const res0 = await api.get('/api/blogs')
	const n0 = res0.body.length

	const newBlog = {
		title: '4 testing POST only',
		author: 'test test test',
		url: 'no',
		likes: 0
	}

	await api.post('/api/blogs').send(newBlog)
	const res = await api.get('/api/blogs')
	expect(res.body.length).toBe(n0 + 1)
})

test('likes of a blog defaults to 0 if not defined', async () => {
	const newBlog = {
		title: '4 testing defaut likes',
		author: 'no defined likes',
		url: '0'
	}
	const res = await api.post('/api/blogs').send(newBlog)
	expect(res.body.likes).toBe(0)
})

test('missing title or url results to 400 bad request', async () => {
	const untitled = {
		author: 'no defined likes',
		url: '0'
	}
	const noUrl = {
		title: 'urless',
		author: 'jaakko',
		likes: 1,
	}
	const res1 = await api.post('/api/blogs').send(untitled).expect(400)
	const res2 = await api.post('/api/blogs').send(noUrl).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})