const Todo = require('../models/todo')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
let today  = new Date()
let todayInfo = today.toLocaleDateString("en-US", options)

//GET
const get_redirect = (req,res) => {
    if (req.session.isLoggedIn){
        res.redirect('/todo')
    } 
    res.redirect('/login')
    
}
const get_login = (req,res) => {
    res.render('login')
}
const get_signup = (req,res) => {
    res.render('signup')
}

const get_todo = (req,res) => {
    Todo.findById(req.session.userID, (err,found) =>{
        res.render('todo', {today: todayInfo, tasks: found.task})
    })
}


//POST
const task_create = (req,res) => {
    const newTask = req.body.taskInput
    Todo.findById(req.session.userID, (err,found) =>{
        if(err) {console.log(err)}
        found.task.push(newTask)
        found.save()
        res.redirect('/todo')
    })
}

const task_delete = (req,res) => {
    const delTask = req.body.checkbox
    Todo.findById(req.session.userID, (err,found) =>{
        if(err) {console.log(err)}
        found.task.splice(found.task.indexOf(delTask), 1)
        found.save()
        res.redirect('/todo')
    })
}
const user_login = (req,res) => {
    Todo.findOne({email: req.body.email}, (err,found) =>{
        if(err){console.log(err)}
        if (bcrypt.compareSync(req.body.password, found.password)===true){
            req.session.isLoggedIn = true
            req.session.userID = found._id
            res.redirect('/todo')
        }else{res.redirect('/login')}
    })

}
const user_signup = (req,res) => {
    const newEmail = req.body.email
    const newPassword = bcrypt.hashSync(req.body.password, salt)
    const newUser = new Todo({
        email: newEmail,
        password: newPassword,
        task: []
    })
    newUser.save()
    req.session.isLoggedIn = true
    req.session.userID = newUser._id
    res.redirect('/todo')
}

const user_logout = (req,res) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect("/login")
    })
}


module.exports = {get_redirect, get_login, get_signup, get_todo, task_create, task_delete, user_login, user_signup, user_logout}