const express = require('express')
const router = express.Router()
const Person = require('../models/persons')

/*let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const getId = () => {
  return Math.floor(Math.random() * 100000)
}

const validateName = async (name) => {
  if (!name) {
    throw new Error('field name cannot be empty')
  }

  const personExists = await Person.findOne({ name })
  if (personExists) {
    throw new Error(`Name ${name} already exists`)
  }

  return name
}

const validateNumber = (number) => {
  if (!number) {
    throw new Error('field number cannot be empty')
  }
  return number
}
*/

router.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => res.status(200).json(persons))
    .catch(error => next(error))
})

router.get('/info', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.status(200).send(
        `<p>
          PersonBook has info for ${persons.length} people<br/>
          ${new Date()}
        </p>`
      )
    })
    .catch(error => next(error))
})

router.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)

    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error))
})

router.post('/api/persons/', async (req, res, next) => {
  try {
    const { name, number } = req.body

    // if exist -> update
    const person = await Person.findOne({ name })
    if (person) {
      person.number = number
      const updatedPerson = await person.save()
      return res.json(updatedPerson)
    }

    const newPerson = new Person({
      name,
      number,
    })
    const savedPerson = await newPerson.save()
    res.status(201).json(savedPerson)
  } catch (error) {
    next(error)
  }
})

router.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(error => next(error))
})

module.exports = router