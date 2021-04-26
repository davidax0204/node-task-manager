const express =require('express')
// const { update } = require('../db/mongoose')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks',auth, async (req,res)=>
{
    
    const task = new Task
    ({
        ...req.body,
        owner: req.user._id
    })
    try 
    {
        await task.save()
        res.status(201).send(task)
    }
    catch(e)
    {
        res.status(401).send()
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10$skip=20
// Get /tasks?sortBy=createdAt
router.get("/tasks",auth, async (req,res)=>
{
    const match = {}
    const sort = {}

    if(req.query.completed)
    {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy)
    {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    
    try
    {
        // Alternative 1
        // const tasks = await Task.find({ owner:req.user._id })
        // res.status(201).send(tasks)

        // Alternative 2
        // await req.user.populate('tasks').execPopulate()
        // res.status(201).send(req.user.tasks)

        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()

        res.status(201).send(req.user.tasks)
    }
    catch(e)
    {
        res.status(401).send()
    }
})

router.get(('/tasks/:id'),auth, async (req,res)=>
{

    const _id = req.params.id
    try
    {
        const task = await Task.findOne({_id, owner: req.user._id })
        console.log(_id)
        console.log(req.user._id)
        if(!task)
        {
            res.status(404).send()
        }
        res.status(201).send(task)
    }
    catch(e)
    {
        res.status(401).send()
    }
})

router.patch('/tasks/:id', auth, async(req,res)=>
{
    const allowedUpdates = ['description','completed']
    const updates = Object.keys(req.body)

    const isValidUpdates = updates.every((update)=>
    {
        return allowedUpdates.includes(update)
    })

    if(!isValidUpdates)
    {
        res.status(400).send({error:'Invalid updates!!!'})
    }

    try
    {
        const task = await Task.findOne({_id:req.params.id, owner: req.user._id })
        
        if (!task)
        {
            res.status(404).send()
        }

        updates.forEach((update)=>
        {
            task[update] = req.body[update]
        })

        await task.save()

        res.status(201).send(task)
    }
    catch(e)
    {
        res.status(501).send(e)
    }

})

router.delete('/tasks/:id', auth, async (req,res)=>
{
    const _id = req.params.id
    try
    {
        const task = await Task.findOneAndDelete({_id, owner:req.user._id})
        if(!task)
        {
            return res.status(404).send()
        }
        res.status(201).send(task)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})

module.exports = router