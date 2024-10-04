const express = require('express')
const recordsRouter = require('./routes/Records')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('req-body', function getReqBody (request) {
  return JSON.stringify(request.body)
})

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(400).json({ error: 'Duplicate key error' })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))


app.use('/', recordsRouter)



app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})