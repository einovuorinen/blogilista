const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
	const body = request.body

	if (body.password.length < 3) {
		return response.status(400).json({ error: 'password must be at least 3 characters long' })
	}
	try {
		const saltRounds = 10
		const passwordHash = await bcrypt.hash(body.password, saltRounds)

		const user = new User({
			name: body.name,
			username: body.username,
			passwordHash,
		})

		const savedUser = await user.save()

		response.json(savedUser)
	}
	catch (exeption) {next(exeption)}
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  	.populate('blogs')
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter