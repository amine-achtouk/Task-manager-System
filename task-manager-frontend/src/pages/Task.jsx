import api from '../services/api'
import { useState, useEffect } from 'react'
import '../style/Task.css'

const Task = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')

  const fetchTasks = async () => {
    try {
      const res = await api.get('/task/get')
      setTasks(res.data.tasks)
    } catch {
      setError('Failed to load tasks')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
      window.location.href = '/login'
    }
    else{
      fetchTasks()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description) {
      setError('All fields are required')
      return
    }

    try {
      if (editId) {
        await api.put(`/task/update/${editId}`, {
          title,
          description
        })
        setEditId(null)
      } else {
        await api.post('/task/create', {
          title,
          description
        })
      }

      setTitle('')
      setDescription('')
      setError('')
      fetchTasks()
    } catch {
      setError('Something went wrong')
    }
  }

  const handleEdit = (task) => {
    setEditId(task._id)
    setTitle(task.title)
    setDescription(task.description)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    try {
      await api.delete(`/task/delete/${id}`)
      fetchTasks()
    } catch {
      setError('Failed to delete task')
    }
  }

  const clearForm = async() =>{
    setTitle('')
    setDescription('')
    setEditId(null)
  }

  const toggleStatus = async (id) =>{
    try{
      await api.put(`/task/status/${id}`)
      fetchTasks()
    }
    catch{
      setError('Failed to update status')
    }
  }

  return (
<>
<div className="dashboard-container">
  <header className="dashboard-header">
    <div className="header-text">
      <h2>Task Management</h2>
      <p>{tasks.length} active tasks</p>
    </div>
  </header>

  {error && <div className="error-banner">{error}</div>}

  <section className={`task-creator ${editId ? 'is-editing' : ''}`}>
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-body">
        <input
          type="text"
          className="title-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          className="desc-input"
          placeholder="Add details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      
      <div className="form-actions">
        {editId && (
          <button type="button" className="cancel-btn" onClick={clearForm}>
            Cancel
          </button>
        )}
        <button type="submit" className="submit-btn">
          {editId ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  </section>

  <div className="divider" />

  <section className="task-list">
    {tasks.length === 0 ? (
      <div className="empty-state">
        <p>No tasks yet. Enjoy your free time!</p>
      </div>
    ) : (
      tasks.map((task) => (
        <div key={task._id} className={`task-item ${editId === task._id ? 'editing-now' : ''}`}>
          <div className="task-content">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <small>Status: {task.status}</small>
          </div>
          

          <div className="task-actions">
           <button 
  className={`status-btn ${task.status === 'completed' ? 'status-completed' : 'status-pending'}`} 
  onClick={() => toggleStatus(task._id)}
>
  {task.status === 'pending' ? (
    <><span className="icon">✔</span> Mark Done</>
  ) : (
    <><span className="icon">↩</span> Undo</>
  )}
</button>
            <button className="edit-btn" onClick={() => handleEdit(task)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => handleDelete(task._id)}>
              Delete
            </button>
          </div>
        </div>
      ))
    )}
  </section>
</div>
</>
  )
}

export default Task
