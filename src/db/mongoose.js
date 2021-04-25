const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify:false
})


const Tasks = mongoose.model('Tasks',{
    description:{
        type:String,
        trim: true,
        required: true,
    },
    completed:{
        type:Boolean,
        required: false,
        default: false
    }
})

module.exports = Tasks

// new Tasks(
//     {
//       description: 'go to the gym     ',
//       completed:false  
//     }
// ).save().then((tasks)=>
// {
//     console.log(tasks)
// }).catch((err)=>
// {
//     console.log(err)
// })