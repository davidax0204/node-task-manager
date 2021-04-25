const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next) =>
{
    try
    {
        const token = req.header('Authorization').replace('Bearer ','')
        // console.log("Token :",token)
        // from user - generateAuthToken
        const decoded = jwt.verify(token, 'thisismycourse')
        // console.log("decoded " , decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
        // console.log("User : ",user)
        if(!user)
        {
            // to trigger the catch
            throw new Error()
        }
        // create a verubale inside of req names user with the datas of the fetched user
        req.token = token
        req.user = user
        next()
    }
    catch(e)
    {
        console.log(e)
        res.status(401).send({error: 'please authenticate'})
    }
}

// module.exports = auth

// const jwt = require('jsonwebtoken')
// const User = require('../models/user')

// const auth = async(req,res,next) =>
// {
//     try
//     {
//         const token = req.header('Authorization').replace('Bearer ','')
//         const decoded = jwt.verify(token, 'thisismycourse')
//         // find a user with the correct id and has the same token stored
//         const user = await User.findOne({ _id:decoded._id, 'tokens.token':token })
//         if (!user)
//         {
//             throw new Error()
//         }
//         req.user = user

//         next()
//     }
//     catch(e)
//     {
//         res.status(401).send({error:'please authenticate'})
//     }
// }

module.exports = auth
