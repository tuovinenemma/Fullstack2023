const express = require('express')
const app = express()


app.use(express.json())
const morgan = require('morgan')

morgan.token("data", (req, res) => {
    return JSON.stringify(req.body)
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))

let persons = [ {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
},
{
   id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
},
{
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
},
{
    id: "4",
    name: "Mary Poppendick",
    number: "39-23-6423122"
}
]


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
    const dateTimeObject = new Date();
    const sum = persons.length
    
    res.send("Phonebook has info for " + sum + " people " + dateTimeObject.toDateString() + dateTimeObject.toTimeString());
})


app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
      
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number is missing' 
      })
    }

    if (!body.name) {
        return response.status(400).json({ 
          error: 'name is missing' 
        })
    }

    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({ 
          error: 'error name has to be unique' 
        })
    }
  
    const person = {
      name: body.name || false,
      number: body.number || false,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})




const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})