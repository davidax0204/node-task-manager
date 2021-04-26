const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description:{
        type:String,
        trim: true,
        required: true,
    },
    completed:{
        type:Boolean,
        required: false,
        default: false
    },
    owner:
    {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        // exactly 'User' like we create in the user model scheme
        ref: 'User'
    }
},
{
    timestamps:true
})

const Tasks = mongoose.model('Task',taskSchema)

module.exports = Tasks