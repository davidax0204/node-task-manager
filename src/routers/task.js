const express =require('express')
const { update } = require('../db/mongoose')
const router = new express.Router()
const Tasks = require('../db/mongoose')

router.post('/tasks', async (req,res)=>
{
    
    const tasks = new Tasks(req.body)
    try 
    {
        await tasks.save()
        res.status(201).send(tasks)
    }
    catch(e)
    {
        res.status(401).send()
    }
})

router.get("/tasks", async (req,res)=>
{
    try
    {
        const tasks = await Tasks.find({})
        res.status(201).send(tasks)
    }
    catch(e)
    {
        res.status(401).send()
    }
})

router.get(('/tasks/:id'),async (req,res)=>
{
    const _id = req.params.id
    try
    {
        const user = await Tasks.findById(_id)
        if(!user)
        {
            res.status(404).send()
        }
        res.status(201).send(user)
    }
    catch(e)
    {
        res.status(401).send()
    }
})

router.patch('/tasks/:id', async(req,res)=>
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

    const _id = req.params.id
    try
    {
        const task = await Tasks.findById(_id)
        updates.forEach((update)=>
        {
            task[update] = req.body[update]
        })

        await task.save()
        
        // const user = await Tasks.findByIdAndUpdate(_id, req.body, {new:true, runValidators:true})
        if (!user)
        {
            res.status(404).send()
        }
        res.status(201).send(user)
    }
    catch(e)
    {
        res.status(501).send(e)
    }

})

router.delete('/tasks/:id',async (req,res)=>
{
    const _id = req.params.id
    try
    {
        const user = await Tasks.findByIdAndDelete(_id)
        if(!user)
        {
            return res.status(404).send()
        }
        res.status(201).send(user)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})

module.exports = router