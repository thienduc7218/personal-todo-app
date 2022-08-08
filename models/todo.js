 const mongoose = require('mongoose')
 const schema = mongoose.Schema

 const todoSchema = new schema({
     email: {type: String, required: true},
     password: {type: String, required: true},
     task: {type: Array, required: true},
 },{timestamps: true})

 const Todo = mongoose.model('todo', todoSchema)
 module.exports = Todo;