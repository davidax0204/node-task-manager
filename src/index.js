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

const Task = require('./models/task')
const User = require('./models/user')

const main = async ()=>
{
    // const task = await Task.findById('6085a93d6f68e4153c6fdb82')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user = await User.findById('6085a788c5c4712e9cd3acc2')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
}

main()
