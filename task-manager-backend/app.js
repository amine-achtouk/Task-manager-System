const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())

const userRouter = require('./routes/userRouter')
const taskRouter = require('./routes/taskRouter')

app.use('/api/auth', userRouter)
app.use('/api/task', taskRouter)

app.get('/', (req, res) => {
  res.send('API is running...')
})

module.exports = app