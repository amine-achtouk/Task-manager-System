const Task = require('../models/taskModel')


const createTask = async(req, res) =>{
    try{
        const {title, description} = req.body
        const userId = req.user.id
        if(!title || !description) return res.status(400).json({ message : 'all field required'})

        const newTask = await Task.create({
            title,
            description,
            author : userId
        })
        
        res.status(201).json({
            message: 'Successfully created Task',
            newTask,
        })
    }
    catch{
        res.status(500).json({ message : 'Server Error'})
    }
}

const getAllTask = async (req, res) =>{
    try{
        const userId = req.user.id
        const tasks = await Task.find({ author : userId})

         res.status(200).json({tasks})    
    }
    catch{
        res.status(500).json({ message : 'Server Error'})
    }
}

const updateTask = async (req, res) =>{
    try{
        const taskId = req.params.id
        const userId = req.user.id

        const task = await Task.findById(taskId)
        if(!task) return res.status(400).json({ message : 'Task not found'})

        if(task.author.toString() !== userId ) return res.status(403).json({ message: 'User not authorized to update this task' });   

        const updatetask = await Task.findByIdAndUpdate(
            taskId,
            req.body,
            { new: true, runValidators: true }
        )

        res.status(200).json({
            message: 'Task updated successfully',
            updatetask
        });
    }
    catch{
        res.status(500).json({ message : 'Server Error'})
    }
}

const updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.id
    const userId = req.user.id

    const task = await Task.findById(taskId)
    if (!task) return res.status(404).json({ message: 'Task not found' })

    if (task.author.toString() !== userId)
      return res.status(403).json({ message: 'Not authorized' })

    task.status = task.status === 'pending' ? 'completed' : 'pending'
    await task.save()

    res.status(200).json(task)
  } catch {
    res.status(500).json({ message: 'Server Error' })
  }
}


const deleteTask = async (req, res) =>{
    try{
        const taskId = req.params.id
        const userId = req.user.id

        const task = await Task.findById(taskId)
        if(!task) return res.status(400).json({ message : 'Task not found'})

        if(task.author.toString() !== userId ) return res.status(404).json({ message: 'User not authorized to delete this task' });  
        
        const deletetask = await Task.findByIdAndDelete(taskId)

         res.status(200).json({
            message: 'Task deleted successfully',
        });
    }
    catch{
        res.status(500).json({ message : 'Server Error'})
    }
}

module.exports = { createTask, getAllTask, updateTask, updateTaskStatus, deleteTask }