const mongoose = require('mongoose')

const Tasks = mongoose.model('Task',{
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
})

module.exports = Tasks