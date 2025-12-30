const express = require('express')
const router = express.Router()
const { createTask, getAllTask, updateTask, updateTaskStatus, deleteTask } = require('../controllers/taskController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/create', authMiddleware, createTask)
router.get('/get', authMiddleware, getAllTask)
router.put('/update/:id', authMiddleware, updateTask)
router.put('/status/:id', authMiddleware, updateTaskStatus)
router.delete('/delete/:id', authMiddleware, deleteTask)

module.exports = router