
const taskController = require('../controllers/taskController')
const express = require('express')
const router = express.Router()

//index page
router.get ('/', taskController.get_redirect)

router.get('/login', taskController.get_login)

router.get('/signup', taskController.get_signup)

router.get('/todo', taskController.get_todo)


//create new task
router.post('/', taskController.task_create)

router.post('/delete', taskController.task_delete)

router.post('/user_login', taskController.user_login)

router.post('/user_signup', taskController.user_signup)

router.post('/user_logout', taskController.user_logout)



//export
module.exports = router

