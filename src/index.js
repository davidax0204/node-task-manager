const express = require('express')
require('./db/mongoose')
const userRouter = require('../src/routers/user')
const tasksRouter = require('../src/routers/task')

const app = express()
const port = process.env.port || 3000

app.use(express.json())
app.use(userRouter)
app.use(tasksRouter)

app.listen(port, ()=>
{
    console.log('server is on port '+ port)
})


