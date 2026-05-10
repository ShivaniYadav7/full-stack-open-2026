require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const path = require('path')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    },
    {
      "name": "Gary Oat",
      "number": "000000",
      "id": "5"
    }
  ]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const personsCount = persons.length
    const now = new Date()
    const content = `
    <p>Phonebook has info for ${personsCount} people</p>
    <p>${now}</p>`
    response.send(content)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  if(person) {
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
  ? Math.max(...persons.map(n => Number(n.id)))
  : 0

  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const alreadyExists = persons.find(person => person.name === body.name)

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'data missing'
    })
  }

  if(alreadyExists) {
    return response.status(409).json({
      error: "name must be unique"
    })
  }
  
  const person = {
    "name": body.name,
    "number": body.number,
    "id": generateId(),
  }

  persons = persons.concat(person)
  response.json(person)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})