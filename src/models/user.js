const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
      type: String,
      unique:true,
      required:true,
      trim: true,
      lowercase: true,
    //   validate(value)
    //   {
    //       if (!validator.isEmail(value))
    //         throw new Error('Invalid email')
    //   },
      
    },
    age: {
        type:Number,
        default: 0,
        validate(value) 
        {
            if (value < 0)
            {
                throw new Error('Age must be about 0')
            }
        }
    },
    password:
    {
        type: String,
        minLength: 6,
        trim: true,
        validate(value)
        {
            if(validator.contains(value,'password'))
            {
                throw new error('Cant contain the word passowrd')
            }
        }
    },
    tokens:
    [{
        token:
        {
            type:String,
            required:true
        }
    }]
})

// must be a function and not an arrown function becuase we are using the 'this'
userSchema.methods.generateAuthToken = async function  ()
{
    const user = this 
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismycourse')

    user.tokens = user.tokens.concat({ token:token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async(email,password)=>
{
    const user = await User.findOne({email})

    if (!user)
    {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch)
    {
        throw new Error('Unble to login')
    }

    return user
}

// Hash the plain text passowrod before saving
// must be a function and not an arrown function becuase we are using the 'this'
userSchema.pre('save',async function(next)
{
    const user = this
    
    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})


const User = mongoose.model('User',userSchema)

module.exports = User