import { useState, useEffect } from 'react'
import axios from 'axios'

function TodoList() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/todos/')
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
      await axios.post('/api/todos/', { title, description, completed: false })
      setTitle('')
      setDescription('')
      fetchTasks()
    } catch (err) {
      console.error('Error creating task:', err)
    }
  }

  const toggleTask = async (task) => {
    try {
      await axios.put(`/api/todos/${task.id}/`, {
        ...task,
        completed: !task.completed,
      })
      fetchTasks()
    } catch (err) {
      console.error('Error updating task:', err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}/`)
      fetchTasks()
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">📝 Todo List</h2>

      {/* Add Task */}
      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={createTask}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="text-center text-gray-400">No tasks yet. Add one above!</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map(task => (
            <li
              key={task.id}
              className="bg-white shadow rounded-xl px-5 py-4 flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                  className="mt-1 w-4 h-4 accent-blue-500 cursor-pointer"
                />
                <div>
                  <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-400 hover:text-red-600 text-sm font-medium transition shrink-0"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TodoList