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

router.get("/tasks",auth, async (req,res)=>
{
    try
    {
        // Alternative 1
        // const tasks = await Task.find({ owner:req.user._id })
        // res.status(201).send(tasks)

        // Alternative 2
        await req.user.populate('tasks').execPopulate()
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