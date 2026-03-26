import { useState, useEffect } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export default function TodoList() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await api.get('/api/todos/')
      setTasks(res.data)
    } catch (err) {
      console.error('Error fetching tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async () => {
    if (!title.trim()) return
    try {
      await api.post('/api/todos/', { title, description, completed: false })
      setTitle('')
      setDescription('')
      fetchTasks()
    } catch (err) {
      console.error('Error creating task:', err)
    }
  }

  const toggleTask = async (task) => {
    try {
      await api.put(`/api/todos/${task.id}/`, { ...task, completed: !task.completed })
      fetchTasks()
    } catch (err) {
      console.error('Error updating task:', err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await api.delete(`/api/todos/${id}/`)
      fetchTasks()
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  const logout = async () => {
    await api.post('/api/auth/logout/')
    navigate('/login')
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Todos</h2>
        <button onClick={logout} className="text-sm text-red-500 hover:text-red-700">Log Out</button>
      </div>

      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded-lg px-4 py-2 mb-3" />
        <input type="text" placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded-lg px-4 py-2 mb-3" />
        <button onClick={createTask} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg">Add Task</button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-400">No tasks yet. Add one above!</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map(task => (
            <li key={task.id} className="bg-white shadow rounded-xl px-5 py-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task)} className="mt-1" />
                <div>
                  <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</p>
                  {task.description && <p className="text-sm text-gray-500">{task.description}</p>}
                </div>
              </div>
              <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-600 text-sm">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}