// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient =mongodb.MongoClient

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error,client)=>
{
    if(error) {
        return console.log('unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    // db.collection('users').findOne({_id:new ObjectID("604e39b740fc9447e0e0c2dd")},(error,user)=>
    // {
    //     if(error) {
    //         console.log('unable to find a user')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({ age: '22' }).toArray((error,users)=>
    // {
    //     console.log(users)
    // })
    
    // db.collection('tasks').insertMany([
    //     {
    //         task:'Wash dishes',
    //         comleted:false
    //     },
    //     {
    //         task:'Install CD',
    //         comleted:true
    //     },{
    //         task:'Watch TV',
    //         comleted:false
    //     }
    // ],(error,users)=>{
    //     if(error){
    //         return console.log('unable to insert users')
    //     }
    //     console.log(users)
    // })

    // db.collection('tasks').findOne({_id:new ObjectID('604e4d3ce98b283da477a1ce')}).then((result)=>
    // {
    //     console.log(result)
    // }).catch((err)=>
    // {
    //     console.log(err)
    // })
    // {
    //     if(error) {return console.log('cant find last user')}
    //     console.log(user)
    // })

    // db.collection('tasks').find({comleted:false}).toArray((error,users)=>
    // {
    //     if(error) {return console.log(error)}
    //     console.log(users)
    // })


    // db.collection('users').updateOne({_id: new ObjectID("604e3f259f14792acc3fb561")},
    //  {
        // $set:
        // {
        //     name:'Bike'
        // }
        // $inc:
        // {
        //     age: 1
        // }
    // }).then((result)=>
    // {
    //     console.log(result)
    // }).catch((error)=>
    // {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({comleted:false},{
    //     $set:{
    //         comleted:true
    //     }
    // }).then((result)=>
    // {
    //     console.log(result)
    // }).catch((error)=>
    // {
    //     console.log(error)
    // })

    //  db.collection('users').deleteMany({age:"22.5"}).then((result)=>
    //  {
    //      console.log(result)
    //  }).catch((error)=>
    //  {
    //      console.log(error)
    //  })

    // db.collection('tasks').insertMany([
    //     {
    //         task:'Wash dishes',
    //         comleted:false
    //     },
    //     {
    //         task:'Install CD',
    //         comleted:true
    //     },{
    //         task:'Watch TV',
    //         comleted:false
    //     }
    // ],(error,users)=>{
    //     if(error){
    //         return console.log('unable to insert users')
    //     }
    //     console.log(users)
    // })



    // db.collection('tasks').deleteOne({task: "Install CD"}).then((result)=>
    // {
    //     console.log(result)
    // }).catch((error)=>
    // {
    //     console.log(error)
    // })


    
}) 