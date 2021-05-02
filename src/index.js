const express = require('express')
require('./db/mongoose')
const userRouter = require('../src/routers/user')
const tasksRouter = require('../src/routers/task')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(tasksRouter)

app.listen(PORT, ()=>
{
    console.log('server is on port '+ PORT)
})


