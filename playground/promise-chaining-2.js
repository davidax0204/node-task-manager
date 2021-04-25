require('../src/db/mongoose')
const Tasks = require('../src/db/mongoose')

// Tasks.findByIdAndDelete('6068401b76cffb367ce4e756').then((deletedTask)=>
// {
//     console.log(deletedTask)
//     return Tasks.countDocuments({completed:false})
// }).then((incompletedTasks)=>{
//     console.log('the amount of incompleted tasks is: ',incompletedTasks)
// }).catch((e)=>
// {
//     console.log(e)
// })


const deleteTaskAndCount = async (id)=>
{
    await Tasks.findByIdAndDelete(id)
    return Tasks.countDocuments({completed:false})
}

deleteTaskAndCount('6064a52569806c05986b2a06').then((uncompletedDocs)=>
{
    console.log(uncompletedDocs)
}).catch((e)=>
{
    console.log(e)
})