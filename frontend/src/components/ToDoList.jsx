import { useState, useEffect } from 'react'
import axios from 'axios'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Anybody:wght@400;600;800;900&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --ink: #0f0e0c;
    --paper: #f5f0e8;
    --accent: #ff4d00;
    --accent2: #ffd600;
    --muted: #b5af9f;
    --card-bg: #fffef9;
    --border: #0f0e0c;
    --done-bg: #e8e3d5;
  }

  .todo-root {
    font-family: 'Anybody', sans-serif;
    background: var(--paper);
    min-height: 100vh;
    padding: 48px 20px 80px;
    position: relative;
    overflow-x: hidden;
  }

  .todo-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(15,14,12,0.07) 39px, rgba(15,14,12,0.07) 40px),
      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(15,14,12,0.04) 39px, rgba(15,14,12,0.04) 40px);
    pointer-events: none;
    z-index: 0;
  }

  .todo-wrap {
    max-width: 560px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* Header */
  .todo-header {
    margin-bottom: 40px;
  }

  .todo-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
  }

  .todo-title {
    font-size: clamp(52px, 12vw, 80px);
    font-weight: 900;
    line-height: 0.9;
    color: var(--ink);
    letter-spacing: -0.03em;
    text-transform: uppercase;
    position: relative;
    display: inline-block;
  }

  .todo-title span {
    color: var(--accent);
  }

  .todo-title-underline {
    display: block;
    height: 6px;
    background: var(--accent);
    margin-top: 8px;
    transform-origin: left;
  }

  /* Add Task Card */
  .add-card {
    background: var(--card-bg);
    border: 2.5px solid var(--border);
    border-radius: 4px;
    padding: 24px;
    margin-bottom: 32px;
    box-shadow: 5px 5px 0px var(--ink);
    position: relative;
    overflow: hidden;
  }

  .add-card::before {
    content: '+';
    position: absolute;
    top: -18px;
    right: 20px;
    font-size: 120px;
    font-weight: 900;
    color: rgba(15,14,12,0.04);
    line-height: 1;
    pointer-events: none;
    font-family: 'Anybody', sans-serif;
  }

  .field-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
    display: block;
  }

  .todo-input {
    width: 100%;
    border: 2px solid var(--border);
    border-radius: 3px;
    padding: 10px 14px;
    margin-bottom: 16px;
    font-family: 'Anybody', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--ink);
    background: var(--paper);
    box-sizing: border-box;
    transition: box-shadow 0.15s, border-color 0.15s;
    outline: none;
    -webkit-appearance: none;
  }

  .todo-input::placeholder {
    color: var(--muted);
    font-weight: 400;
  }

  .todo-input:focus {
    border-color: var(--accent);
    box-shadow: 3px 3px 0 var(--accent);
  }

  .add-btn {
    width: 100%;
    background: var(--ink);
    color: var(--paper);
    border: 2px solid var(--ink);
    border-radius: 3px;
    padding: 13px 24px;
    font-family: 'Anybody', sans-serif;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.12s, color 0.12s, transform 0.1s, box-shadow 0.1s;
    box-shadow: 3px 3px 0 var(--accent);
    position: relative;
    overflow: hidden;
  }

  .add-btn:hover {
    background: var(--accent);
    border-color: var(--accent);
    box-shadow: 4px 4px 0 var(--ink);
    transform: translate(-1px, -1px);
  }

  .add-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 var(--ink);
  }

  /* Task count */
  .task-count-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .task-count-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .task-count-badge {
    background: var(--accent2);
    color: var(--ink);
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 100px;
    border: 1.5px solid var(--ink);
  }

  /* Task items */
  .task-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .task-item {
    background: var(--card-bg);
    border: 2.5px solid var(--border);
    border-radius: 4px;
    padding: 16px 20px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    box-shadow: 4px 4px 0 var(--ink);
    transition: transform 0.12s, box-shadow 0.12s;
    position: relative;
  }

  .task-item:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--ink);
  }

  .task-item.done {
    background: var(--done-bg);
    box-shadow: 4px 4px 0 var(--muted);
    border-color: var(--muted);
  }

  .task-item.done:hover {
    transform: translate(-1px, -1px);
    box-shadow: 5px 5px 0 var(--muted);
  }

  /* Custom checkbox */
  .checkbox-wrap {
    position: relative;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .task-checkbox {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .checkbox-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border: 2.5px solid var(--ink);
    border-radius: 3px;
    background: var(--paper);
    cursor: pointer;
    transition: background 0.12s, border-color 0.12s;
    flex-shrink: 0;
  }

  .task-checkbox:checked + .checkbox-box {
    background: var(--accent);
    border-color: var(--accent);
  }

  .checkbox-mark {
    display: none;
    width: 12px;
    height: 12px;
    stroke: #fff;
    stroke-width: 3;
    fill: none;
  }

  .task-checkbox:checked + .checkbox-box .checkbox-mark {
    display: block;
  }

  .task-body {
    flex: 1;
    min-width: 0;
  }

  .task-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 3px;
    line-height: 1.3;
    word-break: break-word;
    transition: color 0.15s;
  }

  .task-item.done .task-title {
    text-decoration: line-through;
    color: var(--muted);
  }

  .task-desc {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: var(--muted);
    margin: 0;
    font-weight: 400;
    word-break: break-word;
  }

  /* Task number */
  .task-num {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    position: absolute;
    top: 8px;
    right: 48px;
  }

  /* Delete button */
  .delete-btn {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: var(--muted);
    transition: color 0.12s, transform 0.1s;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
  }

  .delete-btn:hover {
    color: var(--accent);
    transform: scale(1.2) rotate(10deg);
  }

  .delete-btn svg {
    width: 18px;
    height: 18px;
  }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 48px 24px;
    border: 2.5px dashed var(--muted);
    border-radius: 4px;
    color: var(--muted);
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 12px;
    display: block;
    opacity: 0.5;
  }

  .empty-label {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* Loading */
  .loading-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 16px;
    font-family: 'Anybody', sans-serif;
    font-weight: 800;
    font-size: 24px;
    letter-spacing: -0.02em;
    color: var(--ink);
    text-transform: uppercase;
    background: var(--paper);
  }

  .loading-bar-track {
    width: 200px;
    height: 6px;
    background: var(--done-bg);
    border: 2px solid var(--ink);
    border-radius: 100px;
    overflow: hidden;
  }

  .loading-bar-fill {
    height: 100%;
    background: var(--accent);
    animation: loading-sweep 1s ease-in-out infinite alternate;
    border-radius: 100px;
  }

  @keyframes loading-sweep {
    from { width: 20%; margin-left: 0; }
    to { width: 60%; margin-left: 40%; }
  }

  @media (max-width: 480px) {
    .todo-root { padding: 32px 16px 60px; }
    .task-num { display: none; }
  }
`

const API = 'http://127.0.0.1:8000/todolist/'

function TodoList() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('') // Track API errors

  // Base API URL
  const API = 'http://127.0.0.1:8000/todolist/'

  // Fetch tasks from API
  const fetchTasks = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await axios.get(API)
      if (Array.isArray(res.data)) {
        setTasks(res.data)
      } else {
        setTasks([]) // fallback if API returns something unexpected
      }
    } catch (err) {
      console.error('Error fetching tasks:', err)
      setError('Failed to load tasks.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // Create a new task
  const createTask = async () => {
    if (!title.trim()) return
    setError('')
    try {
      await axios.post(API, { title, description, completed: false })
      setTitle('')
      setDescription('')
      fetchTasks()
    } catch (err) {
      console.error('Error creating task:', err)
      setError('Failed to create task.')
    }
  }

  // Toggle completion
  const toggleTask = async (task) => {
    setError('')
    try {
      await axios.patch(`${API}${task.id}/`, { completed: !task.completed })
      setTasks(prev =>
        prev.map(t => (t.id === task.id ? { ...t, completed: !t.completed } : t))
      )
    } catch (err) {
      console.error('Error updating task:', err)
      setError('Failed to update task.')
    }
  }

  // Delete a task
  const deleteTask = async (id) => {
    setError('')
    try {
      await axios.delete(`${API}${id}/`)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error('Error deleting task:', err)
      setError('Failed to delete task.')
    }
  }

  // Add task on Enter
  const handleKey = (e) => {
    if (e.key === 'Enter') createTask()
  }

  const doneCount = tasks.filter(t => t.completed).length

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="loading-wrap">
          <span>Loading…</span>
          <div className="loading-bar-track">
            <div className="loading-bar-fill" />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{styles}</style>
      <div className="todo-root">
        <div className="todo-wrap">
          {/* Header */}
          <div className="todo-header">
            <p className="todo-eyebrow">— your list</p>
            <h1 className="todo-title">
              To<span>·</span>Do
              <span className="todo-title-underline" />
            </h1>
          </div>

          {/* Error */}
          {error && <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>}

          {/* Add Task */}
          <div className="add-card">
            <label className="field-label">Task title</label>
            <input
              type="text"
              placeholder="What needs doing?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={handleKey}
              className="todo-input"
            />
            <label className="field-label">Note (optional)</label>
            <input
              type="text"
              placeholder="Add a detail…"
              value={description}
              onChange={e => setDescription(e.target.value)}
              onKeyDown={handleKey}
              className="todo-input"
            />
            <button onClick={createTask} className="add-btn">
              + Add Task
            </button>
          </div>

          {/* Task list header */}
          {tasks.length > 0 && (
            <div className="task-count-row">
              <span className="task-count-label">
                {doneCount}/{tasks.length} done
              </span>
              <span className="task-count-badge">
                {tasks.length - doneCount} left
              </span>
            </div>
          )}

          {/* Tasks */}
          {tasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">◻</span>
              <p className="empty-label">Nothing here yet — add a task above</p>
            </div>
          ) : (
            <ul className="task-list">
              {tasks.map((task, i) => (
                <li key={task.id} className={`task-item${task.completed ? ' done' : ''}`}>
                  <span className="task-num">#{String(i + 1).padStart(2, '0')}</span>

                  <div className="checkbox-wrap">
                    <input
                      type="checkbox"
                      className="task-checkbox"
                      id={`chk-${task.id}`}
                      checked={task.completed}
                      onChange={() => toggleTask(task)}
                    />
                    <label className="checkbox-box" htmlFor={`chk-${task.id}`}>
                      <svg className="checkbox-mark" viewBox="0 0 12 12">
                        <polyline points="1.5,6 4.5,9.5 10.5,2.5" />
                      </svg>
                    </label>
                  </div>

                  <div className="task-body">
                    <p className="task-title">{task.title}</p>
                    {task.description && (
                      <p className="task-desc">{task.description}</p>
                    )}
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="delete-btn"
                    aria-label="Delete task"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default TodoList