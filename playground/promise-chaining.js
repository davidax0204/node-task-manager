require('../src/db/mongoose')
const User = require('../src/models/user')

// 606714d35363a00a284425e5

// User.findByIdAndUpdate('606714d35363a00a284425e5', { age: 1 }).then((user)=>
// {
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((amountOfDocs)=>
// {
//     console.log(amountOfDocs)
// }).catch((e)=>
// {
//     console.log(e)
// })

const updateAgeAndCount = async (id,age)=>
{
    const user = await User.findByIdAndUpdate(id, { age : age })
    const count = await User.countDocuments({ age : age })
    return count
}

updateAgeAndCount('606714d35363a00a284425e5',2).then((count)=>
{
    console.log(count)
}).catch((e)=>
{
    console.log(e)
})