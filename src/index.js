const express = require('express')
require('./db/mongoose')
const userRouter = require('../src/routers/user')
const tasksRouter = require('../src/routers/task')

const app = express()
const port = process.env.port || 3000

// app.use((req,res,next)=>
// {
//     if(req.method === 'GET')
//     {
//         res.send('GET request are disabeled')
//     }
//     else
//     {
//         next()
//     }
// })

// app.use((req,res,next)=>
// {
//     if(req.method === 'GET' || req.method === 'POST' || req.method === 'PATCH' || req.method === 'DELETE')
//     {
//         res.send('503 code - the site is under maintance')
//     }
//     else
//     {
//         next()
//     }
// })

app.use(express.json())
app.use(userRouter)
app.use(tasksRouter)

app.listen(port, ()=>
{
    console.log('server is on port '+ port)
})

const jwt = require('jsonwebtoken')

const myFunction = async ()=>
{
    const token = jwt.sign({ _id: 'abc123' }, 'thisismytoken', {expiresIn: '7 days'})
    console.log(token)

    const data = jwt.verify(token, 'thisismytoken')
    console.log(data)
}

myFunction()