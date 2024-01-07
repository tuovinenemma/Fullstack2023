const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
   
  if (password === undefined) {
    return response.status(400).json({ error: 'password is missing' })
  }
   
  if (password.length < 3) {
    return response.status(400).json({ error: 'password must be min 3 length' })   
  }  

  if (username === undefined) {
    return response.status(400).json({ error: 'username is missing' })
  }
   
  if (username.length < 3) {
    return response.status(400).json({ error: 'username must be min 3 length' })   
  }  

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'expected `username` to be unique'
    })
  }
 
  const saltRounds = 10  
  const passwordHash = await bcrypt.hash(password, saltRounds)   

  const user = new User({
    username,
    name,
    passwordHash,
  })  

  const savedUser = await user.save() 

  response.status(201).json(savedUser)  
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1 })

  response.json(users)
})
module.exports = usersRouter