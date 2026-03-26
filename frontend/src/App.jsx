import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoList from './components/ToDoList'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <TodoList />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}